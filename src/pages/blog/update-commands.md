---
title: 'Terminal commands for updating everything'
date: 2022-08-30
description: List of terminal commands for both Linux and Windows for updating packages, language tools, etc...
layout: ../../layouts/PostLayout.astro
---

## Windows

```powershell
winget upgrade
winget upgrade --all
```

```powershell
choco outdated -l
choco upgrade all
```

```powershell
scoop update
```

```powershell
Update-Module
```

```powershell
Get-Help [Command]
Update-Help [-UICulture en-US]
```

## Rust and all its tools

```bash
rustup update
rustup self update
```

## Deno

```bash
deno upgrade
```

## Linux

### Updating pip and all python packages in the current venv

```bash
python3 -m pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 python3 -m pip install --upgrade
```
