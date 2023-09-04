# decentralised-health-repository-provider

# NHDM Blockchain Application - README

## Problem Statement
Compared with traditional paper-based medical records, electronic health records (EHRs) are widely used because of their efficiency, security, and reducing data redundancy. However, **interoperability of data and privacy** are two big challenges. The Government of India has attempted to create NHDM (National Health Data Management) to define interoperability.

A distributed ledger protocol composed of encrypted blocks of data organized in chains, **blockchain** represents a potential tool to solve the shortcomings of EHRs in terms of interoperability and privacy.

## GRiD Blockchain Application
As participants of the GRiD (Government's Research in Distributed Ledger) initiative, you are expected to build an application that allows users to:

### Set up a Blockchain Infrastructure
- **Identity Management**
- **Medical Records Management**

### User Interface for Various Stakeholders
- Clinic
- Hospital
- Individual Doctors
- Diagnostics
- Patient

### Integration of Blockchain Infrastructure with Health Stack
The application should seamlessly integrate with the existing Health Stack system to ensure efficient data flow and interoperability.

### Leverage Abha ID and Aadhar for Identity Management
Utilize **Abha ID and Aadhar** systems for robust and secure identity management across stakeholders.

### Quick Search and Identification of Relevant Documents
The application should allow users to search for medical documents based on various parameters, including:
- Date
- Doctor
- Document Type
- Hospital Name
- Patient Name

### Secure Document Sharing in Different Formats
Users should be able to securely share medical documents in different formats, such as:
- Image
- PDF

### Digitization of Personal Health Records (PHRs)
Facilitate the digitization of personal health records, eliminating the need for physical paperwork and enhancing data accessibility and portability.

## How to Use the Application
To use the NHDM Blockchain Application, follow these steps:

1. Set up a user account and log in securely using **Abha ID and Aadhar** authentication.
2. Select your role among Clinic, Hospital, Individual Doctor, Diagnostics, or Patient.
3. Navigate the user-friendly interface to manage medical records, access patient data, and upload documents.
4. Utilize the quick search feature to find relevant medical documents based on various parameters.
5. Share medical records securely with other authorized stakeholders, enhancing collaboration and patient care.
6. Experience the seamless integration of the blockchain infrastructure with the existing Health Stack system, ensuring data interoperability.

## Technologies Used
The NHDM Blockchain Application utilizes the following technologies:
- **Blockchain Protocol** for secure and tamper-proof data management.
- **Abha ID and Aadhar** for robust identity management and authentication.
- **User-Friendly Interfaces** for easy navigation and adoption by stakeholders.
- **Data Encryption** for enhanced data privacy and security.

## Contributions
We welcome contributions to improve and enhance the NHDM Blockchain Application. Please feel free to raise issues, submit pull requests, and collaborate with us to make healthcare data management more efficient, secure, and interoperable.

Let's work together to revolutionize the healthcare industry in India through blockchain technology!

---

This is the README file for the NHDM Blockchain Application. The content provided outlines the problem statement, the expected features of the application, and how to use it. Additionally, it includes information about technologies used and encourages contributions from the community to improve the application.
sudo apt-get install unzip

# setup instructions

Refer this page https://hyperledger-fabric.readthedocs.io/en/latest/deploy_chaincode.html

cd ./fabric-samples/test-network
./network.sh down
./network.sh up createChannel
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
peer lifecycle chaincode package basic.tar.gz --path ../EHR --lang node --label basic_1.0
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
peer lifecycle chaincode install basic.tar.gz
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051
peer lifecycle chaincode install basic.tar.gz
peer lifecycle chaincode queryinstalled

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name EHR --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"


export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name EHR --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --output json
