mkdir explorer
cd ./explorer

docker pull ghcr.io/hyperledger-labs/explorer:latest
docker pull ghcr.io/hyperledger-labs/explorer-db:latest

wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/examples/net1/config.json
wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/examples/net1/connection-profile/test-network.json -P connection-profile
wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/docker-compose.yaml

cat >> .env << EOF
PORT=8080
# EXPLORER_CONFIG_FILE_PATH=./examples/net1/config.json
# EXPLORER_PROFILE_DIR_PATH=./examples/net1/connection-profile
# FABRIC_CRYPTO_PATH=/fabric-path/fabric-samples/test-network/organizations
EXPLORER_CONFIG_FILE_PATH=./config.json
EXPLORER_PROFILE_DIR_PATH=./connection-profile
FABRIC_CRYPTO_PATH=./organizations
EOF

sudo cp -r ../fabric-samples/test-network/organizations/ .

export EXPLORER_CONFIG_FILE_PATH=./config.json
export EXPLORER_PROFILE_DIR_PATH=./connection-profile
export FABRIC_CRYPTO_PATH=./organizations
