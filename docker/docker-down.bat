:: Batch file to stop and remove the container with the name "website".
:: Best used after starting a container with the "docker-up" script.

@echo off

set THIS_DIR=%~dp0

docker stop website
docker rm website