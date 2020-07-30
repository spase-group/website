# Run an instance of a SPASE website. 
#
# Run in folder with Dockerfile.
#
# Command line options:
# $1: port number for container (default: 8080)
# $2: name for container (default: spase-website)
# $3: path to folder for website (default: $(pwd)/../site)

port=${1:-8080}
name=${2:-website}
website=${3:-$(pwd)/../docs}

# Normalize path
website=`realpath ${website}`

# Set SUDO appropriate for OS
SUDO=""
case "$OSTYPE" in
  solaris*) SUDO="sudo" ;;
  darwin*)  SUDO="sudo" ;; 
  linux*)   SUDO="sudo" ;;
  bsd*)     SUDO="sudo" ;;
  msys*)    SUDO="" ;;
  *)        SUDO="" ;;
esac

# Use option "-p" to set host port map.
echo $SUDO docker run -p $port:80 --name $name -v $website:/usr/share/nginx/html:ro nginx

$SUDO docker run -p $port:80 --name $name -v $website:/usr/share/nginx/html:ro nginx
