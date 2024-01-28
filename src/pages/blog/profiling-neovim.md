---
title: 'Profiling Neovim'
date: 2024-01-28
pubDate: 2024-01-28
description: How to efficiently profile Neovim
layout: ../../layouts/PostLayout.astro
---

Until today, if I wanted to profile my neovim startup time I would alias `nvim` to something like `nvim --startup ~/nvim-startup.log`. After running the editor for a bunch of times, I would open the log file and manually inspect the timings. 
I was not satisfied with this approach and I wanted something better. Today, I found [stevearc/profile.nvim](https://github.com/stevearc/profile.nvim) after a rather quick googling around.
The setup is straightforward and requires just a copy paste, other than installing the plugin. Then, by running neovim with an environment variable the profiling will take place. It's possible to pass any argument to nvim as usual.
```bash
NVIM_PROFILE=start nvim
```
By pressing F1 as soon as neovim finishes loading, the plugin will produce a json file. The json file, usually named profile.json, can be uploaded in any Chromium browsers' DevTools by going into the **Performance** tab, clicking on the **load** icon and selecting the profile.json file. It is also possible to use [chrome://tracing](chrome://tracing), but I find the experience being much better with the DevTools.
