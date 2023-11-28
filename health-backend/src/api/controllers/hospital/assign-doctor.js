import { User, UserRecord, Token, DoctorRecord, HospitalRecord, Appointment } from "../../../models/index.js";
import { validateRegister } from "../../validators/user.validator.js";
import {
  errorHelper,
  logger,
  getText,
  signAccessToken,
  signRefreshToken,
  ipHelper
} from "../../../utils/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;
import assignDoctorLedger from "./contracts/assignDoctorLedger.js";

export default async (req, res) => {
//   const { error } = validateRegister(req.body);
//   if (error) {
//     let code = "00025";
//     if (error.details[0].message.includes("email")) code = "00026";
//     else if (error.details[0].message.includes("abha_id")) code = "00027";
//     else if (error.details[0].message.includes("name")) code = "00028";
//     else if (error.details[0].message.includes("eth_id")) code = "00093";

//     return res
//       .status(400)
//       .json(errorHelper(code, req, error.details[0].message));
//   }

const hospitalRecord = await HospitalRecord.findOne({ eth_id: req.user.eth_id }).catch((err) => {
  return res.status(500).json(errorHelper("00031", req, err.message));
});

  const appointment = await Appointment.findOne({ _id: req.body.appointmentId }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (!appointment) return res.status(400).json(errorHelper("00042", req));

  req.body.hospitalId = hospitalRecord.registrationId;
  req.body.registrationId = hospitalRecord.registrationId;
  
  try {
    await assignDoctorLedger(req);
  } catch (error) {
    res.status(500).json(({
      error
    }))
  }
  
  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    
  });
};