#!/usr/bin/env bash
# Smoke-test a deployment against the build in dist/: the edge serves *this* build
# (the home page names the same hashed script), every sitemap URL answers 200, a
# missing page answers 404, and the security headers are present.
# usage: bash .github/smoke.sh <base-url>     e.g. https://eyupdevart.com
set -euo pipefail
base=${1:?usage: smoke.sh <base-url>}
base=${base%/}
app=$(grep -oE '/assets/app\.[A-Za-z0-9_-]+\.js' dist/index.html | head -1)
[ -n "$app" ] || { echo "::error::no app script named in dist/index.html"; exit 1; }

# A new version can take a few seconds to reach every edge location.
for i in $(seq 1 ${SMOKE_TRIES:-30}); do
  body=$(curl -fsS --max-time 15 "$base/" || true)
  grep -qF "$app" <<<"$body" && { echo "✓ $base/ serves this build ($app)"; break; }
  [ "$i" = "${SMOKE_TRIES:-30}" ] && { echo "::error::$base/ does not serve this build ($app)"; exit 1; }
  sleep 4
done

fail=0
check() {
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$base$1")
  if [ "$code" = "$2" ]; then echo "✓ $code $1"; else echo "::error::$1 → $code (expected $2)"; fail=1; fi
}
while read -r path; do check "$path" 200; done < <(grep -oE '<loc>[^<]+' dist/sitemap.xml | sed -E 's#<loc>https?://[^/]+##')
check "$app" 200
check /llms.txt 200
check /.well-known/security.txt 200
check /nope/ 404

headers=$(curl -sSI --max-time 15 "$base/")
for h in content-security-policy strict-transport-security x-content-type-options; do
  if grep -qi "^$h:" <<<"$headers"; then echo "✓ header $h"; else echo "::error::missing header $h"; fail=1; fi
done
exit "$fail"
