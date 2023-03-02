---
title: 'Neovim LSP: installing pyright does not work'
date: 2022-10-12
pubDate: 2022-10-12
description: Providing a solution to a problem related to the installation of the pyright syntax analyzer
layout: ../../layouts/PostLayout.astro
---

You have [nvim-lsp-config](https://github.com/neovim/nvim-lspconfig) installed.
You have [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim) installed.
You have [black](https://github.com/psf/black) and [flake8](https://github.com/PyCQA/flake8) installed.
Now you want to install [pyright](https://github.com/microsoft/pyright) and use it as LSP with `null-ls` providing formatting and diagnostics. But it doesn't work.

If you have installed `pyright` with `pip` (`pip install pyright`), there might be a small problem: you have to run at least once a `pyright` command, for instance:

```bash
pyright --version
```

You will notice that when running that command, pyright will install node and npm. WHY???

I'm sure there is some technical reason for this, but in any case I don't want to have a duplicate installation of node. So, let's all run together:

```bash
pip uninstall pyright
```

But now we are of course left with out `pyright`. As noted in the [docs](https://github.com/microsoft/pyright), it is also possible to install it via `npm`. Just run

```bash
npm i -g pyright
```

And again:

```bash
pyright --version
```

Now you will notice that there's no installation of node of npm, I assume because we are using exactly those tools for installing pyright. Now open neovim and voilà, `null-ls` does its job and we can start coding again.
