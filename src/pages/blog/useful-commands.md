---
title: 'Useful terminal commands'
date: 2022-10-09
pubDate: 2022-10-09
draft: true
layout: ../../layouts/PostLayout.astro
---

https://stackoverflow.com/a/24273691/12453976

```bash
FOR /F "tokens=*" %G IN ('dir /b *.avi') DO ffmpeg -i "%G" -c:v copy -c:a aac -y "%~nG.mp4"
```
