# !/bin/bash

docker-compose down
docker image rm -f tcchelp_app
docker image rm -f tcchelp_angular
docker-compose up