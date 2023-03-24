set shell := ["cmd.exe", "/c"]

dev:
  .\node_modules\.bin\astro dev

host:
  .\node_modules\.bin\astro dev --host

build: format
  .\node_modules\.bin\astro build

preview: build
  .\node_modules\.bin\wrangler pages dev dist

format:
  .\node_modules\.bin\prettier -w .

release:
  .\node_modules\.bin\standard-version

upgrade:
  yarn upgrade-interactive

update:
  yarn upgrade-interactive
