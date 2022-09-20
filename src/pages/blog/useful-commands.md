https://stackoverflow.com/a/24273691/12453976

```bat
FOR /F "tokens=*" %G IN ('dir /b *.avi') DO ffmpeg -i "%G" -c:v copy -c:a aac -y "%~nG.mp4"
```
