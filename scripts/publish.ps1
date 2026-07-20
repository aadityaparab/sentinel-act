# sentinel-act one-shot publisher (Windows). Run from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts\publish.ps1
$ErrorActionPreference = "Stop"
$RepoOwner = "aadityaparab"
$Pkg = "sentinel-act"
function Say($m){ Write-Host "`n> $m" -ForegroundColor Magenta }
function Die($m){ Write-Host "`nx $m" -ForegroundColor Red; exit 1 }

Say "Checking environment"
if(-not (Get-Command node -ErrorAction SilentlyContinue)){ Die "node not found" }
if(-not (Get-Command npm  -ErrorAction SilentlyContinue)){ Die "npm not found" }
if([int](node -p "process.versions.node.split('.')[0]") -lt 18){ Die "Node >=18 required (have $(node -v))" }
if(-not (Test-Path package.json)){ Die "No package.json here. cd into the sentinel-act project root first." }
$name = node -p "require('./package.json').name"
if($name -ne $Pkg){ Die "package.json name is '$name', expected '$Pkg'. Wrong folder?" }
$ver = node -p "require('./package.json').version"
Write-Host "Node $(node -v) | $name@$ver"

Say "Checking npm auth"
$who = (npm whoami 2>$null)
if(-not $who){ Die "Not logged into npm. Run: npm login  then re-run." }
Write-Host "npm user: $who"

Say "Checking name availability"
$exists = (npm view $Pkg version 2>$null)
if($exists){ Die "'$Pkg' already on npm (v$exists). Use a scope (@$RepoOwner/$Pkg) or a new name, then update package.json + README." }
Write-Host "'$Pkg' is available"

$haveGh = $false
if(Get-Command gh -ErrorAction SilentlyContinue){ gh auth status 2>$null; if($LASTEXITCODE -eq 0){ $haveGh = $true } }

Say "Installing deps"; npm install
Say "Building";        npm run build
Say "Running tests";   npm test

Say "Preparing GitHub Pages copy (docs/index.html)"
if(Test-Path web/index.html){ New-Item -ItemType Directory -Force -Path docs | Out-Null; Copy-Item web/index.html docs/index.html -Force }

Say "Preparing git"
if(-not (Test-Path .git)){ git init -q }
git add -A
git commit -q -m "sentinel-act v$ver - EU AI Act readiness toolkit + hosted classifier"
git branch -M main

if($haveGh){
  gh repo view "$RepoOwner/$Pkg" 2>$null
  if($LASTEXITCODE -eq 0){
    Say "Repo exists - pushing"; git remote add origin "https://github.com/$RepoOwner/$Pkg.git" 2>$null; git push -u origin main
  } else {
    Say "Creating GitHub repo + pushing"
    gh repo create "$RepoOwner/$Pkg" --public --source=. --remote=origin --push --description "EU AI Act readiness toolkit - classify risk tier, map obligations, generate a checklist and starter docs. CLI + hosted classifier. Not legal advice."
  }
  gh repo edit "$RepoOwner/$Pkg" --add-topic eu-ai-act,ai-governance,compliance,grc,risk-assessment,responsible-ai,ai-act,sentinel-stack
  Say "Enabling GitHub Pages (main /docs)"
  gh api -X POST "repos/$RepoOwner/$Pkg/pages" -f "source[branch]=main" -f "source[path]=/docs" 2>$null
  if($LASTEXITCODE -ne 0){ Write-Host "Enable Pages manually: Settings > Pages > Deploy from a branch > main / /docs" }
} else {
  Say "No gh CLI. Create an EMPTY public repo named '$Pkg' at https://github.com/new (no README), then press Enter."
  Read-Host | Out-Null
  git remote add origin "https://github.com/$RepoOwner/$Pkg.git" 2>$null
  git push -u origin main
  Write-Host "Then enable Pages: Settings > Pages > Deploy from a branch > main / /docs"
}

Say "PUBLISHING to npm (Ctrl+C now to abort)"; Start-Sleep 2
npm publish --access public
Start-Sleep 3; npx --yes "$Pkg@latest" --version

Say "Tagging release v$ver"
git tag "v$ver" 2>$null
git push origin "v$ver"
if($haveGh){ gh release create "v$ver" --title "sentinel-act v$ver" --notes "EU AI Act readiness toolkit + hosted classifier. MIT. Not legal advice." }

Say "Done"
Write-Host "Repo:  https://github.com/$RepoOwner/$Pkg"
Write-Host "npm:   https://www.npmjs.com/package/$Pkg"
Write-Host "Pages: https://$RepoOwner.github.io/$Pkg/   (first deploy can take 1-2 min)"
