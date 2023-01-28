# use PowerShell instead of sh:
set shell := ["powershell.exe", "-c"]

dev:
  .\node_modules\.bin\astro dev

build:
  .\node_modules\.bin\astro build

preview:
  .\node_modules\.bin\wrangler pages dev dist

format:
  .\node_modules\.bin\prettier -W .

release:
  .\node_modules\.bin\standard-version

upgrade:
  yarn upgrade-interactive

update:
  yarn upgrade-interactive
