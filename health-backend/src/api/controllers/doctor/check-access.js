import { User, UserRecord, Token, DoctorRecord, HospitalRecord, Doc } from '../../../models/index.js';
import { ipHelper, errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import geoip from 'geoip-lite';
const { lookup } = geoip;
import checkAccessLedger from './contracts/checkAccessLedger.js';

export default async (req, res) => {
    const eth_id = req.user.eth_id;
    const documentId = req.query.documentId;

    let doc = await Doc.findOne({ _id: documentId }).catch(
        (err) => {
            return res.status(500).json(errorHelper("00041", req, err.message));
        }
    );

    let doctorRecord = await DoctorRecord.findOne({ eth_id: eth_id }).catch(
        (err) => {
            return res.status(500).json(errorHelper("00041", req, err.message));
        }
    );

    req.body.requesterId = doctorRecord.medicalRegistrationNo;
    req.body.documentId = documentId;
    req.body.patientId = doc.patientId;

    const response = await checkAccessLedger(req);

    return res.status(200).json({
        resultMessage: { en: getText('en', '00095') },
        resultCode: '00095',
        response
    });
};
