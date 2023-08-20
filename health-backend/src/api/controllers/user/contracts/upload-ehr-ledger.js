import pkg from 'fabric-network';
const { FileSystemWallet, Gateway, X509WalletMixin } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ccpPath = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const walletPath = path.join(process.cwd(), './wallet');
const wallet = new FileSystemWallet(walletPath);

export default async (req, res) => {
    console.log('******************request body****************');
    try {
        let publicId = "";

        console.log('*******Request body end************');
        if (req.file.filename) {            
            req.body.record = req.file.md5;

            const walletPath = path.join(process.cwd(), './wallet');
            const wallet = new FileSystemWallet(walletPath);

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, {
                wallet,
                identity: req.body.doctorId,
                discovery: { enabled: true, asLocalhost: true }
            });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('EHR');
            console.log(JSON.stringify(req.body));
            // Submit the specified transaction.
            let response = await contract.submitTransaction('createEhr', JSON.stringify(req.body));
            response = JSON.stringify(response.toString());
            console.log(response);

            // Disconnect from the gateway.
            await gateway.disconnect();

            // res.send("Correct");
            return;
        } else {
            console.log("File not found");
            res.send("Failed to upload the health record");
            return;
        }
    } catch (error) {
        console.error(`Failed to generate EHR by doctor ${req.body.userName}: ${error}`);
        res.send("Failed to generate an EHR");
        throw error;
    } finally {
        conn.close();
    }
}