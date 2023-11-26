// const grpc = require('@grpc/grpc-js');
import grpc from '@grpc/grpc-js';
import fabric from '@hyperledger/fabric-gateway';
const { connect, Contract, Identity, Signer, signers } = fabric;
import crypto from 'crypto';
import path from 'path'
import { fileURLToPath } from 'url';

import fs from 'fs/promises';
const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'EHRX');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cryptoPath = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));

// Path to user private key directory.
const keyDirectoryPath = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore'));

// Path to user certificate.
const certPath = envOrDefault('CERT_PATH', path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts', 'cert.pem'));

// Path to peer tls certificate.
const tlsCertPath = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));

// Gateway peer endpoint.
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');

// Gateway peer SSL host name override.
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');
console.log("keyPath " + keyDirectoryPath);
console.log("certPath " + certPath);
console.log("tlsCertPath " + tlsCertPath);

class Connection {
    static contract;
    static gateway;
    async init() {
        await initFabric();
    }

    constructor() {
        if (Connection._instance) {
          return MyClass._instance
        }
        Connection._instance = this;
    }
}

async function initFabric() {
    const client = await newGrpcConnection();

    const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 };
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 };
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 };
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 };
        },
    });

    try {
        const network = gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        Connection.contract = contract;
        Connection.gateway = gateway;
        gateway.getIdentity();

        // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
        // await initLedger(contract);

    } catch (e) {
        console.log('sample log');
        console.log(e.message);
    } finally {
        console.log('error log ');
        // gateway.close();
        // client.close();
    }
}

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

async function newIdentity() {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

async function newSigner() {
    // const privateKeyPem = await fs.readFile(keyDirectoryPath);
    // const privateKey = crypto.createPrivateKey(privateKeyPem);
    // return signers.newPrivateKeySigner(privateKey);
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function initLedger(contract) {
    console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');

    await contract.submitTransaction('InitLedger');

    console.log('*** Transaction committed successfully');
}

function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

async function displayInputParameters() {
    console.log(`channelName:       ${channelName}`);
    console.log(`chaincodeName:     ${chaincodeName}`);
    console.log(`mspId:             ${mspId}`);
    console.log(`cryptoPath:        ${cryptoPath}`);
    console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
    console.log(`certPath:          ${certPath}`);
    console.log(`tlsCertPath:       ${tlsCertPath}`);
    console.log(`peerEndpoint:      ${peerEndpoint}`);
    console.log(`peerHostAlias:     ${peerHostAlias}`);
}

export default Connection;