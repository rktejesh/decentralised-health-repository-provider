import { Doc, Appointment } from '../../../models/index.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import uploadEhrLedger from './contracts/upload-ehr-ledger.js';

export default async (req, res) => {
  console.log(req.body);

  const appointmentId = req.body.appointmentId;

  const appointmentRecord = await Appointment.findOne({ _id: appointmentId }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  let doc = new Doc({
    patient_id: appointmentRecord.patientId,
    doc_type: "EHR",
    filename: req.body.filename,
    filepath: req.body.cid,
    requestAccess: false,
    grantAccess: false,
    date: appointmentRecord.time,
    hospital: appointmentRecord.hospitalId,
    doctor: appointmentRecord.doctorId,
  });

  doc = await doc.save().catch((err) => {
    console.log(err.message);
    return res.status(500).json(errorHelper("00034", req, err.message));
  });
  
  req.body.ehrId = doc._id.toString();
  req.body.userName = req.user.eth_id;
  req.body.patientId = req.user.eth_id;
  req.body.doctorId = appointmentRecord.doctorId;
  req.body.hospitalId = appointmentRecord.hospitalId;
  req.body.record = req.body.cid;

  try {
    await uploadEhrLedger(req);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message
    })
  }

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
  });
};
