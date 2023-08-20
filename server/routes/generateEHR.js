const express = require('express');
const router = express.Router();

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
var handler = require('./sessionKeyHandler');
const ccpPath = path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');

const mongoose = require('mongoose');
const multer = require('multer');
var upload = multer({ storage: './uploads' });


const mongoURI = `mongodb+srv://su:CT9EQLax7Hj9wYj9@cluster0.d0wmo43.mongodb.net/?retryWrites=true&w=majority`;
const conn = mongoose.createConnection(mongoURI);

let databaseHandler = require("./accessDocumentDatabase");

router.post('/', upload.single('file'), async (req, res) => {
    console.log('******************request body****************');
    console.log(req.file);
    // if (req.file) console.log("file is here");
    try {
        let publicId = "";

        console.log('*******Request body end************');
        if (req.file.filename) {
            publicId = await databaseHandler.updateDocumentIntoDatabase(req.body.patientId, "EHR", req.file.filename, req.file.path);

            req.body.ehrId = publicId;
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

            res.send("Correct");
        } else {
            res.send("Failed to upload the health record");
        }
    } catch (error) {
        console.error(`Failed to generate EHR by doctor ${req.body.userName}: ${error}`);
        res.send("Failed to generate an EHR");
    } finally {
        conn.close();
    }
});

module.exports = router;
