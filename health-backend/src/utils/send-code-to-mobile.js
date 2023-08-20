const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
import express from "express";
import twilio from "twilio";
import {
  generateRandomCode,
  sendCodeToEmail,
  errorHelper,
  logger,
  getText,
  signConfirmCodeToken,
} from "./index.js";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
client.logLevel = 'debug';

const router = express.Router();

export async function sendOtp(req, res) {
  return new Promise(async (resolve, reject) => {
    let verificationRequest;

    try {
      await client.verify.v2
        .services(VERIFICATION_SID)
        .verifications.create({ to: req, channel: "sms" })
        .then((verification_check) => {
          logger(
            "00048",
            "",
            getText("en", "00048"),
            verification_check,
            req,
            req
          );
          return resolve(verification_check);
        });
      // .catch((error)=>{
      //   console.log("chi po");
      //   logger("00049", req, getText("en", "00049"), error, error);
      //   return reject(error);
      // });
    } catch (e) {
      logger("00049", "", getText("en", "00049"), e, "", req);
      return reject(e);
    }
  });
}

export async function verifyOtp(mobile, code) {
  // const { verificationCode: code } = req.body;
  // let verificationResult;
  // const errors = { wasValidated: true };

  // try {
  //   verificationResult = await client.verify.services(VERIFICATION_SID)
  //     .verificationChecks
  //     .create({ code, to: req.user.phoneNumber });
  // } catch (e) {
  //   logger.error(e);
  //   return res.status(500).send(e);
  // }

  // logger.debug(verificationResult);

  // if (verificationResult.status === 'approved') {
  //   req.user.role = 'access secret content';
  //   await req.user.save();
  //   return res.redirect('/');
  // }

  // errors.verificationCode = `Unable to verify code. status: ${verificationResult.status}`;
  // return res.render('verify', { title: 'Verify', user: req.user, errors });

  new Promise(async (resolve, reject) => {
    let verificationRequest;
    console.log(mobile + code);
    try {
      console.log("yes");
      let verificationResult;
      await client.verify.v2
        .services(VERIFICATION_SID)
        .verificationChecks.create({ to: mobile, code: code })
        .then((verification_check) => {
          logger(
            "00048",
            "",
            getText("en", "00048"),
            "Info",
            verification_check,
            mobile
          );
          verificationResult = verification_check;
          console.log("cdcs");
        });
      return resolve("verificationResult.status");

      // errors.verificationCode = `Unable to verify code. status: ${verificationResult.status}`;
    } catch (e) {
      console.log(e);
      logger("00049", "", getText("en", "00049"), e, verificationRequest, mobile);
      return reject(e);
    }
  });
}
