update:
	bun x npm-check-updates -u
	bun i
	bun run format

update-interactive:
	bun x npm-check-updates -u -i
	bun i
	bun run format
