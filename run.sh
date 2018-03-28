# !/bin/bash

docker-compose down
docker image rm tcchelp_app
docker image rm tcchelp_angular
docker-compose up