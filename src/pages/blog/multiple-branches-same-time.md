---
title: How to work in multiple branches of the same repo at the same time
date: 2022-01-28
description: Editing multiple branches at the same time using git wroktrees.
layout: ../../layouts/PostLayout.astro
---

You can use Git **worktrees** 🌲 to achieve so. Just `cd` in a git repo and run

```bash
git worktree add <filesystem-location> <branch>
```

and git will create a new folder in the path `<filesystem-location>` and checkout the branch `<branch>` in that folder.

For instance:

```bash
git worktree add ../app-4.2.0 production-4.2.0
```

Now you can manage 2 copies of the same repo at the same time 💏🏽

<small>Full reference: https://git-scm.com/docs/git-worktree</small>
