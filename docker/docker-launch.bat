:: Batch file to run nginx container on the "docs" folder in parent folder.
:: Use port 8080 to access the server. The container name is "website".
:: Prompts for the name of the current folder which can be provider with a command-line like:
::      pwd | docker-launch.bat

@echo off

set /p src=
echo docker run -p 8080:80 --name website -v %src%/docs:/usr/share/nginx/html:ro nginx
docker run -p 8080:80 --name website -v %src%/docs:/usr/share/nginx/html:ro nginx