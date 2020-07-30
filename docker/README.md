# Notes

Git Bash on Windows 10 does funny things with paths which makes it difficult to control volume mapping in Docker containers.
Specifically it adds a ";C" to the end of the path. To address this issue two versions the "docker-up" and "docker-down" scripts
are provided. One for Windows (*.bat) and one for Linux (*.sh) systems.

For improved happiness, use the script appropriate for you operating system.
