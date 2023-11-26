/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import path from 'path';
import fs from 'fs';

export const buildCCPOrg1 = () => {
	// load the common connection configuration file
	const ccpPath = path.resolve(process.cwd(), '..',  'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
	console.log(ccpPath);
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

export const buildCCPOrg2 = () => {
	// load the common connection configuration file
	const ccpPath = path.resolve(process.cwd(), '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');

	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

export const buildWallet = async (Wallets, walletPath) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

export const getContract = async (Wallets, Gateway, userName, walletPath) => {
	// const walletPath = path.join(process.cwd(), './wallet');
	const wallet = await Wallets.newFileSystemWallet(walletPath);

	// Create a new gateway for connecting to our peer node.
	const gateway = new Gateway();
	const ccpPath = path.resolve(process.cwd(), '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
	const connectionProfileJson = (await fs.promises.readFile(ccpPath)).toString();
	const connectionProfile = JSON.parse(connectionProfileJson);
	console.log(userName);
	await gateway.connect(connectionProfile, {
		wallet,
		identity: userName,
		discovery: {enabled: true, asLocalhost: true}
	});

	// Get the network (channel) our contract is deployed to.
	const network = await gateway.getNetwork('mychannel');

	// Get the contract from the network.
	const contract = network.getContract('EHRX');
	return contract;
};

export const prettyJSONString = (inputString) => {
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}