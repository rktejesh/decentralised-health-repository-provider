import fabricnetwork from 'fabric-network';
const { Gateway, Wallets } = fabricnetwork;
import path from 'path';
const walletPath = path.join(process.cwd(), './wallet');
import { getContract } from '../../../../utils/AppUtil.js';

export default async (req, res) => {
    try {
        const contract = await getContract(Wallets, Gateway, req.body.userName, walletPath);

        // Submit the specified transaction.
        console.log(req.body);
        let response = await contract.submitTransaction('createAppointment', JSON.stringify(req.body));
        response = JSON.stringify(response.toString());
        console.log(response);

    } catch (error) {
        console.error(`Failed to create Appointment for the user  ${req.body.id}: ${error}`);
        // res.send("Failed to create Appointment");
        throw error;
    }
};