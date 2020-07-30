:: Batch file to run nginx container on the "docs" folder in parent folder.
:: Use port 8080 to access the server. The container name is "website"
:: The container is actually launched by the docker-launch.bat script.

@echo off

set THIS_DIR=%~dp0

cd ..
pwd | %THIS_DIR%docker-launch.bat