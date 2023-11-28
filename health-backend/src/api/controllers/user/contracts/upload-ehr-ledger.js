import fabricnetwork from 'fabric-network';
const { Gateway, Wallets } = fabricnetwork;
import path from 'path';
const walletPath = path.join(process.cwd(), './wallet');
import { getContract } from '../../../../utils/AppUtil.js';

export default async (req, res) => {
    console.log('******************request body****************');
    try {
        console.log('*******Request body end************');
        const contract = await getContract(Wallets, Gateway, req.body.userName, walletPath);

        // Submit the specified transaction.
        console.log(req.body);
        let response = await contract.submitTransaction('createEhr', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

        // res.send("Correct");
        return;
    } catch (error) {
        console.error(`Failed to generate EHR by doctor ${req.body.userName}: ${error}`);
        res.send("Failed to generate an EHR");
        throw error;
    } finally {
        conn.close();
    }
}