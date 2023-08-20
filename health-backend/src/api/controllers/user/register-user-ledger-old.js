import pkg from 'fabric-network';
const { FileSystemWallet, Gateway, X509WalletMixin, Wallets } = pkg;
import FabricCAClient from 'fabric-ca-client';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const walletPath = path.join(process.cwd(), './wallet');
import Connection from '../../../loaders/fabric.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (req, res) => {
    try {
        // Create a new file system based wallet for managing identities.
        console.log(`************** Wallet path: ${walletPath} **************************`);
        
        const wallet = new FileSystemWallet(walletPath);
        // const wallet = await Wallets.newFileSystemWallet(walletPath);
        // Check to see if we've already enrolled the user

        const userExists = await wallet.exists(req.body.userName);
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
        const gateway = Connection.gateway;
        // const gateway = new Gateway();
        // await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
        // Get the CA client object from the gateway for interacting with the CA.
        // const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getIdentity();

        const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAClient(caURL);

        // build a user object for authenticating with the CA
        // const provider = wallet.getProviderRegistry().getProvider(adminExists.type);
        // const adminUser = await provider.getUserContext(adminExists, 'admin');
        // const adminUser = await wallet.export('admin')

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: req.body.userName,
            role: 'client'
        }, adminIdentity);

        const enrollment = await ca.enroll({ enrollmentID: req.body.userName, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(req.body.userName, userIdentity);

        let response = await registerInLedger(req);

        // let registeredUser = await databaseHandler.registerNewUser(req.body.userName, req.body.firstName + " " + req.body.lastName, 'Patient');
        console.log(registeredUser);
        res.send(registeredUser.ops);
    } catch (error) {
        await wallet.delete(req.body.userName);
        console.error(`Failed to register user ${req.body.userName}: ${error}`);
        res.send("Failed to register candidate");
        // error.map((x)=> console.log(x));
        console.log(error.code);
    }
}
async function registerInLedger(req) {

    try {
        const walletPath = path.join(process.cwd(), '../../wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.userName,
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('EHR');

        // Submit the specified transaction.

        let response = await contract.submitTransaction('createPatient', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        // console.log(response);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
    }
}