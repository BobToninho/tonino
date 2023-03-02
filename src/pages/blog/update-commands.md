---
title: Terminal commands to update everything
#date: 2022-08-30
date: 2022-10-11
pubDate: 2022-10-11
revisionDate: 2023-03-02
description: List of terminal commands for both Linux and Windows for updating packages, language tools, and similar
layout: ../../layouts/PostLayout.astro
---

For some update commands it is appended a command for inspecting the
current state of the tool.

## Windows

Update [wsl]:

```powershell
wsl --update
```

There is no easy way to update the PowerShell modules installed via
`Install-Module`, but [this script][pwsh-update-packages] does the job
perfectly (also removing the packages' old versions).

Update [PowerShell help modules][pwsh-help-modules]:

```powershell
Update-Help [-UICulture en-US]
```

Update package managers' installed packages:

- [winget]

```powershell
winget upgrade
winget upgrade --all
```

- [chocolatey]

```powershell
choco outdated -l
choco upgrade all
```

- [scoop]

```powershell
scoop status
scoop update --all
scoop checkup
scoop cleanup --all
```

## Rust

Rust tools:

```bash
rustup update
```

Rust installed binaries are not updated by running the previous command.
They need to be explicitly updated, for instance, to update
[cargo-watch]:

```bash
cargo install --list
cargo install cargo-watch
```

## Deno

```bash
deno upgrade
```

## Linux

### Updating pip ~~and all python packages in the current venv~~

The first command seems to not work anymore due to the `--outdated` and
the `--format=freeze` commands used together. The second command updates
only pip

```bash
#python3 -m pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 python3 -m pip install --upgrade
python -m pip install --upgrade pip
```

[wsl]: https://learn.microsoft.com/en-us/windows/wsl/about
[pwsh-help-modules]: https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/02-help-system?view=powershell-7.3
[pwsh-update-packages]: https://github.com/HarmVeenstra/Powershellisfun/blob/main/Update%20all%20PowerShell%20Modules/Update-Modules.ps1
[winget]: https://github.com/microsoft/winget-cli
[chocolatey]: https://chocolatey.org/
[scoop]: https://scoop.sh/
[cargo-watch]: https://watchexec.github.io/#cargo-watch
