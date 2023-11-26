import fabricnetwork from 'fabric-network';
const { Gateway, Wallets, X509WalletMixin } = fabricnetwork;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const walletPath = path.join(process.cwd(), './wallet');
const wallet = await Wallets.newFileSystemWallet(walletPath);

export default async (req, res) => {

    try {

        // Create a new file system based wallet for managing identities.

        console.log(`************** Wallet path: ${walletPath} **************************`);

        // Check to see if we've already enrolled the user

        const userExists = await wallet.exists(req.body.registrationId);
        if (userExists) {
            res.send('Candidate has been already registered ... ');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            res.send(' Admin is not currently enrolled. Please wait for sometime ...');
            console.log('Please run enrollAdmin.js file first ... ');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // console.log(JSON.parse(adminIdentity.toString()));
        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: req.body.registrationId,
            role: 'client'
        }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: req.body.registrationId, enrollmentSecret: secret });

        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());

        await wallet.import(req.body.registrationId, userIdentity);

        gateway.disconnect();

        let response = await registerInLedger(req);
        // res.send("Correct");
        console.log(response);

    } catch (error) {
        await wallet.delete(req.body.registrationId);
        console.error(`Failed to register user ${req.body.registrationId}: ${error}`);
        res.send("Failed to register candidate");
        throw error;
    }
};

async function registerInLedger(req) {

    try {
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.registrationId,
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('EHR');

        // Submit the specified transaction.
        console.log(req.body);
        let response = await contract.submitTransaction('createHospital', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

        // Disconnect from the gateway.
        gateway.disconnect();

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        throw error;
    }
}