#!/usr/bin/env bash
# sentinel-act one-shot publisher: npm + GitHub repo + GitHub Pages for the web classifier.
# Run from the sentinel-act project root:  bash scripts/publish.sh
set -euo pipefail
REPO_OWNER="aadityaparab"
PKG_NAME="sentinel-act"

say(){ printf "\n\033[1;35m> %s\033[0m\n" "$1"; }
die(){ printf "\n\033[1;31mx %s\033[0m\n" "$1"; exit 1; }

say "Checking environment"
command -v node >/dev/null || die "node not found"
command -v npm  >/dev/null || die "npm not found"
[ "$(node -p 'process.versions.node.split(".")[0]')" -ge 18 ] || die "Node >=18 required (have $(node -v))"
[ -f package.json ] || die "No package.json here. cd into the sentinel-act project root first."
NAME="$(node -p "require('./package.json').name")"
[ "$NAME" = "$PKG_NAME" ] || die "package.json name is '$NAME', expected '$PKG_NAME'. Wrong folder?"
VERSION="$(node -p "require('./package.json').version")"
echo "Node $(node -v) | $NAME@$VERSION"

say "Checking npm auth"
npm whoami >/dev/null 2>&1 || die "Not logged into npm. Run: npm login   then re-run."
echo "npm user: $(npm whoami)"

say "Checking npm name availability"
if npm view "$PKG_NAME" version >/dev/null 2>&1; then
  die "'$PKG_NAME' already on npm (v$(npm view "$PKG_NAME" version)). Use a scope (@$REPO_OWNER/$PKG_NAME) or a new name, then update package.json + README."
fi
echo "'$PKG_NAME' is available"

HAVE_GH=0
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then HAVE_GH=1; echo "gh: authenticated"; else echo "gh: not available/authed (manual remote; enable Pages by hand)"; fi

say "Installing deps"; npm install
say "Building";        npm run build
say "Running tests";   npm test

say "Preparing GitHub Pages copy (docs/index.html)"
if [ -f web/index.html ]; then mkdir -p docs && cp web/index.html docs/index.html && echo "web/index.html -> docs/index.html"; else echo "web/index.html missing; skipping"; fi

say "Preparing git"
[ -d .git ] || git init -q
git add -A
git commit -q -m "sentinel-act v$VERSION - EU AI Act readiness toolkit + hosted classifier" || echo "(nothing new to commit)"
git branch -M main

if [ "$HAVE_GH" = "1" ]; then
  if gh repo view "$REPO_OWNER/$PKG_NAME" >/dev/null 2>&1; then
    say "Repo exists - pushing"
    git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO_OWNER/$PKG_NAME.git"
    git push -u origin main
  else
    say "Creating GitHub repo + pushing"
    gh repo create "$REPO_OWNER/$PKG_NAME" --public --source=. --remote=origin --push \
      --description "EU AI Act readiness toolkit - classify risk tier, map obligations, generate a checklist and starter docs. CLI + hosted classifier. Not legal advice."
  fi
  gh repo edit "$REPO_OWNER/$PKG_NAME" --add-topic eu-ai-act,ai-governance,compliance,grc,risk-assessment,responsible-ai,ai-act,sentinel-stack || true

  say "Enabling GitHub Pages (main /docs)"
  if gh api -X POST "repos/$REPO_OWNER/$PKG_NAME/pages" -f "source[branch]=main" -f "source[path]=/docs" >/dev/null 2>&1; then
    echo "Pages enabled (main /docs)"
  else
    echo "Pages may already be on, or enable manually: Settings > Pages > Deploy from a branch > main / /docs"
  fi
else
  say "No gh CLI. Create an EMPTY public repo named '$PKG_NAME' at https://github.com/new (no README), then press Enter."
  read -r _
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO_OWNER/$PKG_NAME.git"
  git push -u origin main
  echo "Then enable Pages: Settings > Pages > Deploy from a branch > main / /docs"
fi

say "PUBLISHING to npm (Ctrl+C now to abort)"; sleep 2
npm publish --access public
echo "Verifying..."; sleep 3
npx --yes "$PKG_NAME@latest" --version || true

say "Tagging release v$VERSION"
git tag "v$VERSION" 2>/dev/null || true
git push origin "v$VERSION" || true
if [ "$HAVE_GH" = "1" ]; then
  gh release create "v$VERSION" --title "sentinel-act v$VERSION" --notes "EU AI Act readiness toolkit: risk classifier, obligation mapping, checklist, starter docs, and a hosted web classifier. MIT. Informational - not legal advice." || true
fi

say "Done"
echo "Repo:  https://github.com/$REPO_OWNER/$PKG_NAME"
echo "npm:   https://www.npmjs.com/package/$PKG_NAME"
echo "Pages: https://$REPO_OWNER.github.io/$PKG_NAME/   (first deploy can take 1-2 min)"
echo "Next:  set LEAD_ENDPOINT in docs/index.html, then iframe the Pages URL into authlyx.io."
