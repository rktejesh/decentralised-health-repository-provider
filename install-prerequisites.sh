#!/bin/bash

sudo apt-get install git curl docker-compose -y

# Make sure the Docker daemon is running.
sudo systemctl start docker

# Add your user to the Docker group.
sudo usermod -a -G docker albedo110711

# Check version numbers  
docker --version
docker-compose --version

# Optional: If you want the Docker daemon to start when the system starts, use the following:
sudo systemctl enable docker

./install-fabric.sh d s b
