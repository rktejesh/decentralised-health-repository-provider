import { User, UserRecord, Token, DoctorRecord, HospitalRecord } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import {
  errorHelper,
  logger,
  getText,
  signAccessToken,
  signRefreshToken,
  ipHelper
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;
import registerHospitalLedger from '../contracts/registerHospitalLedger.js';

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

  const user = await User.findOne({ eth_id: req.body.eth_id }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (!user) return res.status(400).json(errorHelper("00042", req));
  if (!user.isVerified) return res.status(400).json(errorHelper("00044"));

  const userexists = await HospitalRecord.findOne({ eth_id: req.body.eth_id })
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

  if (userexists) return res.status(409).json(errorHelper('00097', req));

  let name = req.body.name.trim();
  
  req.body.userName = req.body.eth_id;
  req.body.password = req.body.eth_id;

  req.body.address = "";
  req.body.phone = req.body.mobile;
  
  await registerHospitalLedger(req);
  
  let hospitalRecord = new HospitalRecord({
    eth_id: req.body.eth_id, 
    name: req.body.name,
    mobile: req.body.mobile,
    registrationId: req.body.registrationId,
    // createdByIp: geo,
  });

  hospitalRecord = await hospitalRecord.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });


  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  await Token.updateOne(
    { userId: user._id },
    {
      $set: {
        refreshToken: refreshToken,
        status: true,
        expiresIn: Date.now() + 604800000,
        createdAt: Date.now(),
        createdByIp: ipHelper(req),
      },
    }
  ).catch((err) => {
    logger("00035", user._id, getText("en", "00035"), err, req, req.body.mobile);
    return res.status(500).json(errorHelper("00057", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    hospitalRecord,
    accessToken,
    refreshToken
  });
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: All required information about the user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']
 *                platform:
 *                  type: string
 *                  enum: ['Android', 'IOS']
 *                timezone:
 *                  type: number
 *                deviceId:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You registered successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
