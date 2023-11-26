#!/bin/bash

#install prerequisites for nodejs and npm
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git build-essential

# Add nodejs and npm to deb repository
sudo mkdir -p /etc/apt/keyrings
sudo install -m 0755 -d /etc/apt/keyrings
# curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
NODE_MAJOR=20
# echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instal nodejs and docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose nodejs npm software-properties-common -y

# Make sure the Docker daemon is running.
sudo systemctl start docker

sudo groupadd docker

# Add your user to the Docker group.
sudo usermod -a -G docker ${USER}

# Check version numbers  
docker --version
docker-compose --version

# Optional: If you want the Docker daemon to start when the system starts, use the following:
sudo systemctl enable docker

./install-fabric.sh d b
