import { User, UserRecord, Token, Appointment, DoctorRecord } from '../../../models/index.js';
import { validateEthId, validateLogin } from '../../validators/user.validator.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import { verifyOtp, sendOtp } from '../../../utils/send-code-to-mobile.js';
import geoip from 'geoip-lite';
const { lookup } = geoip;
import ipHelper from '../../../utils/helpers/ip-helper.js';
import HospitalRecord from '../../../models/hospital_record.js';

export default async (req, res) => {
  
  let appointmentRecord = await Appointment.find({ patientId: req.user.eth_id }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (!appointmentRecord) return res.status(400).json(errorHelper("00042", req));

  let doctorNames = [];
  let hospitalNames = [];

  for(let i = 0; i < appointmentRecord.length; i++) {
    let doctorRecord = await DoctorRecord.findOne({ registrationId: appointmentRecord[i].doctorId }).catch((err) => {
      console.log(err.message);
    });

    if(doctorRecord) {
      doctorNames.push(doctorRecord.firstName + " " + doctorRecord.lastName);
    } else {
      doctorNames.push("Not Assigned");
    }

    let hospitalRecord = await HospitalRecord.findOne({ registrationId: appointmentRecord[i].hospitalId }).catch((err) => {
      console.log(err.message);
    });

    console.log(hospitalRecord);

    if(hospitalRecord) {
      hospitalNames.push(hospitalRecord.name);
    } else {
      hospitalNames.push("Not Assigned");
    }
  }

  console.log(doctorNames);

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    appointments: appointmentRecord,
    doctorNames,
    hospitalNames
  });
};