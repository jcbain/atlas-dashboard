docker-compose down
docker rmi $(docker images -a -q)
echo y | docker volume prune 
docker-compose up
