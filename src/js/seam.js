// ─────────────────────────────────────────────────────────────────────────────
//  THE SEAM — WebGL2 hero for eyupdevart.com
//
//  One living field, rendered twice. Left of the seam the developer sees it as
//  code: ASCII glyphs on a grid. Right of the seam the artist sees it as fire:
//  molten, lit, iridescent metal. The DevArt wordmark is embossed into both.
//  Drag the seam and the word itself changes hands.
//
//  Budget-aware: adaptive resolution, pauses off-screen / in background tabs,
//  a still frame for reduced motion, and no WebGL at all without a real GPU
//  (the CSS wordmark carries the hero instead).
// ─────────────────────────────────────────────────────────────────────────────

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uRes;
uniform float uTime;
uniform float uSeam;
uniform float uIntro;
uniform float uCell;
uniform float uPx;
uniform vec2 uMouse;
uniform vec2 uLight;
uniform vec4 uTextRect;
uniform float uScrim;
uniform sampler2D uText;
out vec4 outColor;

const vec3 BG = vec3(0.0235, 0.0235, 0.031);
const vec3 EMBER = vec3(1.0, 0.357, 0.133);
const vec3 BONE = vec3(0.925, 0.91, 0.875);
const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

float h21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}

float fbm3(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { s += a * noise(p); p = ROT * p; a *= 0.5; }
  return s / 0.875;
}

float fbm4(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * noise(p); p = ROT * p; a *= 0.5; }
  return s / 0.9375;
}

// 5x5 bitmap glyphs packed in 25-bit integers.
float glyph(int n, vec2 p) {
  p = floor(p * vec2(-4.0, 4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
    int a = int(round(p.x) + 5.0 * round(p.y));
    if (((n >> a) & 1) == 1) return 1.0;
  }
  return 0.0;
}

vec4 textAt(vec2 fc) {
  vec2 uv = (fc - uTextRect.xy) / uTextRect.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return vec4(0.0);
  return texture(uText, uv);
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float t = uTime;

  float seamX = uSeam
    + sin(fc.y * 0.011 / uPx + t * 1.7) * 2.2 * uPx
    + sin(fc.y * 0.037 / uPx - t * 2.6) * 0.9 * uPx;
  bool dev = fc.x < seamX;

  vec2 cell = floor(fc / uCell);
  vec2 cc = (cell + 0.5) * uCell;
  vec2 sp = dev ? cc : fc;

  // The shared field: two levels of domain warping over value-noise fbm.
  vec2 p = sp / uRes.y * 2.6;
  vec2 dm = (sp - uMouse) / uRes.y;
  float md = length(dm);
  p += dm / (md + 1e-3) * 0.045 * exp(-md * md * 16.0) * sin(md * 30.0 - t * 3.2);
  vec2 q = vec2(fbm3(p + vec2(0.0, t * 0.05)), fbm3(p + vec2(5.2, 1.3) - t * 0.04));
  vec2 r = vec2(fbm3(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.08), fbm3(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.06));
  float f = fbm4(p + 2.4 * r);

  vec4 tx = textAt(sp);

  // ── ART: molten, lit metal ──
  float h = f * 1.25 + tx.b * 0.85;
  vec3 n = normalize(vec3(-dFdx(h), -dFdy(h), 7.0 / uRes.y));
  vec3 L = normalize(vec3(uLight, 0.8));
  float dif = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 36.0);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.5);
  float heat = smoothstep(0.62, 0.95, f + 0.3 * r.x - 0.12);
  vec3 base = mix(vec3(0.02, 0.018, 0.035), vec3(0.15, 0.08, 0.3) * 0.6, smoothstep(0.25, 0.75, f));
  base = mix(base, EMBER * 0.8, heat * 0.7);
  vec3 iri = 0.55 + 0.45 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + f * 1.3 + n.x * 0.7 + n.y * 0.3));
  vec3 art = base * (0.35 + 0.85 * dif) + spec * vec3(1.0, 0.88, 0.78) * 0.75 + fres * iri * 0.22;
  float lm = smoothstep(0.3, 0.7, tx.g);
  float env = smoothstep(-0.5, 0.9, n.y * 0.8 + n.x * 0.35 + (f - 0.5) * 0.9);
  vec3 chrome = mix(vec3(0.16, 0.14, 0.15), BONE, env) + spec * 1.4 + EMBER * fres * 1.6;
  art = mix(art, chrome, lm);

  // ── DEV: the same field, as code ──
  float g = clamp(f * 1.35 - 0.22, 0.0, 1.0);
  float letter = tx.r;
  float lvl = max(g * 0.62, letter * 0.95);
  int ch = 4096;
  if (lvl > 0.2) ch = 65600;
  if (lvl > 0.3) ch = 332772;
  if (lvl > 0.4) ch = 15255086;
  if (lvl > 0.5) ch = 23385164;
  if (lvl > 0.6) ch = 15252014;
  if (lvl > 0.7) ch = 13199452;
  if (lvl > 0.8) ch = 11512810;
  if (letter > 0.5) ch = 33554431; // solid LED block: letters stay legible at any cell count
  vec2 lp = mod(fc / (uCell * 0.5), 2.0) - 1.0;
  float gch = glyph(ch, lp);
  vec3 devc = mix(BONE * (0.07 + 0.3 * g), mix(EMBER, BONE, 0.35 + 0.4 * g), letter) * gch;
  float typed = step(h21(cell) * 0.3 + (seamX - cc.x) / uRes.x * 0.9, uIntro * 1.35);
  devc *= typed;

  vec3 col = dev ? devc : art * smoothstep(0.0, 0.12, uIntro * 1.25 - (fc.x - seamX) / uRes.x);

  // ── The seam itself ──
  float dx = abs(fc.x - seamX) / uPx;
  col += EMBER * (exp(-dx * 0.5) * 0.95 + exp(-dx * 0.05) * 0.16) * uIntro;
  col += vec3(1.0, 0.86, 0.76) * exp(-dx * 1.4) * 0.85 * uIntro;

  // Vignette, scrim for the copy below, film grain.
  vec2 uv = fc / uRes;
  col *= smoothstep(1.4, 0.3, length((uv - vec2(0.5, 0.56)) * vec2(1.05, 1.35)));
  col = mix(col, BG, smoothstep(uScrim + 0.1 * uRes.y, uScrim - 0.1 * uRes.y, fc.y) * 0.86);
  col = mix(BG, col, uIntro);
  col += (h21(fc + fract(t * 7.13) * 91.0) - 0.5) * 0.028;
  outColor = vec4(col, 1.0);
}`;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function start(canvas) {
  const hero = canvas.closest('[data-hero]');
  const devEl = hero?.querySelector('[data-wm-dev]');
  const artEl = hero?.querySelector('[data-wm-art]');
  const plusEl = hero?.querySelector('[data-wm-plus]');
  if (!hero || !devEl || !artEl || !plusEl) return;

  const og = new URLSearchParams(location.search).has('og');
  // No real GPU (software rasteriser) → keep the CSS wordmark. Burning a visitor's
  // CPU on a shader is not art. `?og` lifts the gate for social-card rendering.
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: !og,
  });
  if (!gl) return;

  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
  const software = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  if (software && !og) {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return;
  }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = !reduce && !og;

  // Compile without blocking the main thread where the driver allows it.
  const parallel = gl.getExtension('KHR_parallel_shader_compile');
  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const vs = shader(gl.VERTEX_SHADER, VERT);
  const fs = shader(gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, 'aPos');
  gl.linkProgram(prog);

  const whenLinked = () =>
    new Promise((resolve) => {
      const poll = () =>
        !parallel || gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR) ? resolve() : setTimeout(poll, 16);
      poll();
    });

  Promise.all([whenLinked(), document.fonts?.ready]).then(() => {
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[seam]', gl.getShaderInfoLog(fs) || gl.getProgramInfoLog(prog));
      return;
    }
    run();
  });

  function run() {
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    for (const k of ['uRes', 'uTime', 'uSeam', 'uIntro', 'uCell', 'uPx', 'uMouse', 'uLight', 'uTextRect', 'uText', 'uScrim'])
      U[k] = gl.getUniformLocation(prog, k);

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(U.uText, 0);

    // Backing-store budget in device pixels; adapted to the GPU at runtime.
    let budget = og ? 2.4e6 : innerWidth < 700 ? 4.5e5 : 1.1e6;
    const maxBudget = innerWidth < 700 ? 9e5 : 2.4e6;
    let W = 0, H = 0, scale = 1, cssW = 0, cssH = 0;
    let rest = 0, seam = 0, target = 0;
    let mouse = [0, 0], light = [0.35, 0.45], lastMove = -1e9, still = 0;

    function layoutText() {
      const cr = canvas.getBoundingClientRect();
      const rd = devEl.getBoundingClientRect();
      const ra = artEl.getBoundingClientRect();
      const rp = plusEl.getBoundingClientRect();
      const monoPx = parseFloat(getComputedStyle(devEl).fontSize);
      const serifPx = parseFloat(getComputedStyle(artEl).fontSize);
      const c2 = document.createElement('canvas');
      const ctx = c2.getContext('2d');
      const monoFont = `500 ${monoPx}px "Geist Mono", ui-monospace, monospace`;
      const serifFont = `italic 400 ${serifPx}px "Instrument Serif", serif`;

      ctx.font = monoFont;
      const mDev = ctx.measureText('Dev');
      const mArt = ctx.measureText('Art');
      ctx.font = serifFont;
      const sDev = ctx.measureText('Dev');
      const sArt = ctx.measureText('Art');

      const x0 = cr.left, y0 = cr.top;
      const monoBase = rd.top - y0 + mDev.fontBoundingBoxAscent;
      const serifBase = ra.top - y0 + sDev.fontBoundingBoxAscent;
      const monoDevX = rd.left - x0;
      const serifArtX = ra.left - x0;
      const serifDevX = rd.right - x0 - sDev.width;
      const pad = monoPx * 0.3;
      const left = Math.min(monoDevX, serifDevX) - pad;
      const right = serifArtX + Math.max(sArt.width, mArt.width) + pad * 1.4;
      const top = Math.min(rd.top, ra.top) - y0 - pad;
      const bottom = Math.max(rd.bottom, ra.bottom) - y0 + pad;

      const tw = Math.max(2, Math.ceil((right - left) * scale));
      const th = Math.max(2, Math.ceil((bottom - top) * scale));
      c2.width = tw;
      c2.height = th;
      ctx.setTransform(scale, 0, 0, scale, -left * scale, -top * scale);
      ctx.globalCompositeOperation = 'lighter';
      ctx.textBaseline = 'alphabetic';

      // Mono layer, dilated so every ASCII cell that touches a stroke lights up.
      ctx.font = monoFont;
      ctx.fillStyle = ctx.strokeStyle = '#f00';
      ctx.lineWidth = monoPx * 0.03;
      ctx.lineJoin = 'round';
      for (const [w, x] of [['Dev', monoDevX], ['Art', serifArtX]]) {
        ctx.fillText(w, x, monoBase);
        ctx.strokeText(w, x, monoBase);
      }

      ctx.font = serifFont;
      ctx.fillStyle = '#0f0';
      ctx.fillText('Dev', serifDevX, serifBase);
      ctx.fillText('Art', serifArtX, serifBase);

      // Blurred copy for the height map — via shadow, which every browser blurs.
      const off = 20000;
      ctx.fillStyle = '#00f';
      ctx.shadowColor = '#00f';
      ctx.shadowBlur = serifPx * 0.06 * scale;
      ctx.shadowOffsetX = off * scale;
      ctx.fillText('Dev', serifDevX - off, serifBase);
      ctx.fillText('Art', serifArtX - off, serifBase);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true); // channels = true coverage
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c2);
      gl.uniform4f(U.uTextRect, left * scale, (cssH - bottom) * scale, tw, th);

      const wmHeight = Math.max(rd.height, ra.height);
      const cellCss = clamp(wmHeight / 14, 6, 13);
      // Snap cells to multiples of 8 device px: each 5x5 glyph pixel lands on whole pixels.
      gl.uniform1f(U.uCell, Math.max(8, Math.round((cellCss * scale) / 8) * 8));
      const copy = hero.querySelector('.hero__bottom')?.getBoundingClientRect();
      gl.uniform1f(U.uScrim, copy?.height ? (cr.bottom - copy.top) * scale : H * 0.3);
      rest = (rp.left + rp.width / 2 - x0) * scale;
      if (!seam) seam = target = rest;
      else {
        seam = rest;
        target = rest;
      }
      mouse = [rest * 1.15, H * 0.55];
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      cssW = r.width;
      cssH = r.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const q = Math.min(1, Math.sqrt(budget / Math.max(1, cssW * cssH * dpr * dpr)));
      W = Math.max(2, Math.round(cssW * dpr * q));
      H = Math.max(2, Math.round(cssH * dpr * q));
      scale = W / cssW;
      canvas.width = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
      gl.uniform2f(U.uRes, W, H);
      gl.uniform1f(U.uPx, scale);
      layoutText();
    }

    // ── Input ──
    hero.addEventListener(
      'pointermove',
      (e) => {
        const r = canvas.getBoundingClientRect();
        const x = (e.clientX - r.left) * scale;
        const y = (r.bottom - e.clientY) * scale;
        target = clamp(x, W * 0.03, W * 0.97);
        mouse = [x, y];
        light = [clamp(((x / W) - 0.5) * 2.4, -1.4, 1.4), clamp(((y / H) - 0.5) * 2.4, -1.4, 1.4)];
        lastMove = performance.now();
        if (!animate && !still) still = requestAnimationFrame(() => ((still = 0), draw(performance.now())));
      },
      { passive: true },
    );
    hero.addEventListener('pointerleave', () => (lastMove = performance.now() - 1800));

    // ── Frame ──
    const t0 = performance.now();
    let prev = t0, raf = 0, visible = true, frames = 0, acc = 0, live = false;
    const stillTime = 11.5;

    function draw(now) {
      const t = animate ? (now - t0) / 1000 + 4 : stillTime;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (animate) {
        const idle = now - lastMove > 2600;
        if (idle) {
          target = rest + Math.sin(t * 0.42) * W * 0.065;
          light = [Math.cos(t * 0.31) * 0.8, 0.35 + Math.sin(t * 0.43) * 0.5];
          mouse = [rest + Math.cos(t * 0.27) * W * 0.25, H * (0.55 + Math.sin(t * 0.36) * 0.15)];
        }
        seam += (target - seam) * (1 - Math.exp(-dt * (idle ? 2.2 : 7)));
      } else {
        seam = lastMove > 0 ? target : rest;
      }
      const intro = animate ? Math.min(1, (now - t0) / 1700) : 1;
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uSeam, seam);
      gl.uniform1f(U.uIntro, 1 - Math.pow(1 - intro, 3));
      gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
      gl.uniform2f(U.uLight, light[0], light[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!live) {
        live = true;
        requestAnimationFrame(() => hero.classList.add('is-live'));
      }
    }

    function frame(now) {
      raf = 0;
      const dt = (now - prev) / 1000;
      draw(now);
      // Adaptive resolution: hold ~60fps, trade pixels for smoothness.
      acc += dt;
      if (++frames === 45) {
        const avg = acc / frames;
        const early = now - t0 < 9000;
        if (avg > 1 / 45 && budget > 1.6e5) {
          budget *= 0.72;
          resize();
        } else if (early && avg < 1 / 57 && budget < maxBudget) {
          budget = Math.min(maxBudget, budget * 1.18);
          resize();
        }
        frames = 0;
        acc = 0;
      }
      loop();
    }

    const loop = () => {
      if (animate && visible && !document.hidden && !raf) raf = requestAnimationFrame(frame);
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) {
          prev = performance.now();
          loop();
        }
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => {
      prev = performance.now();
      loop();
    });

    let rt = 0;
    new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        resize();
        if (!animate && !still) still = requestAnimationFrame(() => ((still = 0), draw(performance.now())));
      }, 120);
    }).observe(canvas);

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      hero.classList.remove('is-live');
    });

    resize();
    draw(performance.now());
    loop();
  }
}
