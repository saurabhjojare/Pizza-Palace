#!/bin/sh

echo "Stopping all containers..."
docker stop $(docker ps -aq)

echo "Removing all containers..."
docker rm $(docker ps -aq)

echo "Removing all images..."
docker rmi -f $(docker images -q)

echo "Removing all volumes..."
docker volume rm $(docker volume ls -q)

echo "Pruning networks..."
docker network prune -f

echo "Pruning build cache..."
docker builder prune -a -f

echo "Docker cleanup complete."
