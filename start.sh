docker stop bufsbus-server bufsbus-mysql > /dev/null 2>&1 
docker rm bufsbus-server bufsbus-mysql > /dev/null 2>&1
docker-compose up -d --build