# !/bin/bash

docker-compose -f docker-compose.test-unit.yml build
docker-compose -f docker-compose.test-unit.yml up