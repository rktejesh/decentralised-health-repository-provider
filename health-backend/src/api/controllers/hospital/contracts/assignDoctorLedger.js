import fabricnetwork from 'fabric-network';
const { Gateway, Wallets } = fabricnetwork;
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { buildCAClient, registerAndEnrollUser, enrollAdmin } from '../../../../utils/CAUtil.js';
import { buildCCPOrg1, buildWallet, getContract } from '../../../../utils/AppUtil.js';

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'EHR';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(process.cwd(), './wallet');
const ccpPath = path.resolve(process.cwd(), '..', '..', '..', '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');

export default async (req, res) => {

    try {
        console.log(`************** Registering in Ledger: **************************`);
        const contract = await getContract(Wallets, Gateway, req.body.registrationId, walletPath);

        // Submit the specified transaction.
        console.log(req.body);
        let response = await contract.submitTransaction('assignDoctor', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);
        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        throw error;
    }
}