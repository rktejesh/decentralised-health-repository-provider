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
    const userName = req.body.medicalRegistrationNo;
    console.log(req.body);
    console.log(`************** Wallet path: ${walletPath} **************************`);

    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();
    console.log(`************** Wallet path: ${walletPath} **************************`);


    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    console.log(`************** Wallet path: ${walletPath} **************************`);

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);
    console.log(`************** Wallet path: ${walletPath} **************************`);

    // Check to see if we've already enrolled the admin user.
    await enrollAdmin(caClient, wallet, mspOrg1);
    console.log(`************** Wallet path: ${walletPath} **************************`);
    
    // Register the user, enroll the user, and import the new identity into the wallet.
    await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');
    console.log(`************** Wallet path: ${walletPath} **************************`);

    try { 
        let response = await registerInLedger(req);
    } catch (error) {
        await wallet.remove(req.body.medicalRegistrationNo);
        console.error(`Failed to register user ${req.body.medicalRegistrationNo}: ${error}`);
        // res.send("Failed to register candidate");
        throw error;
    }
};

async function registerInLedger(req) {

    try {
        console.log(`************** Registering in Ledger: **************************`);
        const contract = await getContract(Wallets, Gateway, req.body.medicalRegistrationNo, walletPath);

        // Submit the specified transaction.
        let response = await contract.submitTransaction('createDoctor', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
    }
}