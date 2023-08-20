import { Doc } from '../../../models/index.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import uploadEhrLedger from './contracts/upload-ehr-ledger.js';

export default async (req, res) => {
  console.log(req.body);
  // console.log(req.file);
  
  let doc = new Doc({
    patient_id: req.user.eth_id,
    doc_type: "EHR",
    filename: req.body.filename,
    filepath: req.body.cid,
    requestAccess: false,
    grantAccess: false,
    date: req.body.date,
    hospital: req.body.hospital,
    doctor: req.body.doctor,
  });

  doc = await doc.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });
  
  // req.body.ehrId = doc._id;
  // req.body.userName = req.user.eth_id;
  // req.body.patientId = req.user.eth_id;

  // await uploadEhrLedger(req);

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
  });
};
