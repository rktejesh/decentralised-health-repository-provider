# decentralised-health-repository-provider

# NHDM Blockchain Application - README

## Problem Statement
Compared with traditional paper-based medical records, electronic health records (EHRs) are widely used because of their efficiency, security, and reducing data redundancy. However, **interoperability of data and privacy** are two big challenges. The Government of India has attempted to create NHDM (National Health Data Management) to define interoperability.

A distributed ledger protocol composed of encrypted blocks of data organized in chains, **blockchain** represents a potential tool to solve the shortcomings of EHRs in terms of interoperability and privacy.

# setup instructions

Refer this page https://hyperledger-fabric.readthedocs.io/en/latest/deploy_chaincode.html

```
./install-prerequisites.sh
./setup-blockchain.sh
./setup-explorer.sh
cd ./health-backend/
npm run start
cd ../health-frontend
npm run start
```

### Set up a Blockchain Infrastructure
- **Identity Management**
- **Medical Records Management**

### User Interface for Various Stakeholders
- Clinic
- Hospital
- Individual Doctors
- Diagnostics
- Patient

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

## How to Use the Application
To use the NHDM Blockchain Application, follow these steps:

1. Set up a user account and log in securely using **Abha ID and Aadhar** authentication.
2. Select your role among Clinic, Hospital, Individual Doctor, Diagnostics, or Patient.
3. Navigate the user-friendly interface to manage medical records, access patient data, and upload documents.
4. Utilize the quick search feature to find relevant medical documents based on various parameters.
5. Share medical records securely with other authorized stakeholders, enhancing collaboration and patient care.
6. Experience the seamless integration of the blockchain infrastructure with the existing Health Stack system, ensuring data interoperability.


## Contributions
We welcome contributions to improve and enhance the NHDM Blockchain Application. Please feel free to raise issues, submit pull requests, and collaborate with us to make healthcare data management more efficient, secure, and interoperable.

Let's work together to revolutionize the healthcare industry in India through blockchain technology!

---
