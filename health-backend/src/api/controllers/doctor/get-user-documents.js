import { User, UserRecord, Token, HospitalRecord, Doc, DocRequest } from '../../../models/index.js';
import { validateEthId, validateLogin } from '../../validators/user.validator.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import { verifyOtp, sendOtp } from '../../../utils/send-code-to-mobile.js';
import geoip from 'geoip-lite';
const { lookup } = geoip;
import ipHelper from '../../../utils/helpers/ip-helper.js';

export default async (req, res) => {
  
  const userDocRecords = await Doc.find().catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

//   if (!userDocRecords) return res.status(400).json(errorHelper("00042", req));


  let requestAccessRecords = [];
  for(let i = 0; i < userDocRecords.length; i++) {
    const d = await DocRequest.findOne({doctorId: req.user.eth_id, docId: userDocRecords[i]._id}).catch((err) => {
        return res.status(500).json(errorHelper("00031", req, err.message));
    });
    requestAccessRecords.push(d.requestAccessRecords);
  }

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    docs: userDocRecords,

  });
};