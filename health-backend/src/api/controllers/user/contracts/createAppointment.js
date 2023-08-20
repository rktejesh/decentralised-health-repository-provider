import pkg from 'fabric-network';
const { FileSystemWallet, Gateway, X509WalletMixin } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const walletPath = path.join(process.cwd(), './wallet');
const wallet = new FileSystemWallet(walletPath);

export default async (req, res) => {
    try {
        const walletPath = path.join(process.cwd(), './wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.userName,
            discovery: {enabled: true, asLocalhost: true}
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('EHR');

        // Submit the specified transaction.
        console.log(req.body);
        let response = await contract.submitTransaction('createAppointment', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to create Appointment for the user  ${req.body.id}: ${error}`);
        // res.send("Failed to create Appointment");
        throw error;
    }
};