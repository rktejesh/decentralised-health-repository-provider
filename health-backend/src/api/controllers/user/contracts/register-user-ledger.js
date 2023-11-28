import path from 'path';
import fs from 'fs';
import FabricCAServices from 'fabric-ca-client';
import fabricnetwork from 'fabric-network';
const { Gateway, Wallets } = fabricnetwork;

import { buildCAClient, registerAndEnrollUser, enrollAdmin } from '../../../../utils/CAUtil.js';
import { buildCCPOrg1, buildWallet, getContract } from '../../../../utils/AppUtil.js';

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'EHRX';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(process.cwd(), './wallet');

export default async (req, res) => {
    const userName = req.body.userName;
    console.log(`************** Wallet path: ${walletPath} **************************`);

    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // Check to see if we've already enrolled the admin user.
    await enrollAdmin(caClient, wallet, mspOrg1);
    
    // Register the user, enroll the user, and import the new identity into the wallet.
    await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');
    console.log(`************** Wallet path: ${walletPath} **************************`);

    try {
        let response = await registerInLedger(req);
        console.log(response);
    } catch (error) {
        await wallet.remove(userName);
        console.error(`Failed to register user ${userName}: ${error}`);
        // res.send("Failed to register candidate");
        // error.map((x)=> console.log(x));
        throw error;
    }
};

async function registerInLedger(req) {
    console.log(req.body);
    try {
        const contract = await getContract(Wallets, Gateway, req.body.userName, walletPath);

        // Submit the specified transaction.
        
        let response = await contract.submitTransaction('createPatient', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        throw error;
    }
}