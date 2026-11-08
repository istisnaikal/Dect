#!/usr/bin/env bash
# Before production: the Cloudflare zone can inject scripts into HTML at the edge (Web
# Analytics, bot detections). If it injects one from an origin this build's CSP does not
# allow, browsers would block it and log CSP errors, so stop before deploying and leave
# production as it is. Fetched as a browser: the edge injects only for browser requests.
# usage: bash .github/edge-preflight.sh <base-url>     (run where dist/ holds the build)
set -euo pipefail
base=${1:?usage: edge-preflight.sh <base-url>}
base=${base%/}
script_src=$(grep -m1 -i 'content-security-policy:' dist/_headers | grep -oE "script-src [^;]*")
ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36'
html=$(curl -fsS --compressed -A "$ua" -H 'Accept: text/html,application/xhtml+xml' "$base/")
fail=0
for origin in $(grep -oE '<script[^>]+src="https?://[^/"]+' <<<"$html" | grep -oE 'https?://[^/"]+$' | sort -u); do
  if grep -qF " $origin" <<<"$script_src"; then
    echo "✓ the edge injects a script from $origin; this build's CSP allows it"
  else
    echo "::error::the edge injects a script from $origin, which this build's CSP blocks ($script_src). Switch that zone feature off, or set its flag in src/site.config.mjs → edge."
    fail=1
  fi
done
[ "$fail" = 0 ] && echo "✓ every script the edge injects is allowed by this build's CSP"
exit "$fail"
