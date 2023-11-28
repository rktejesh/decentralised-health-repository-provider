import { User, UserRecord, Token } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import {
  errorHelper,
  logger,
  getText,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import ipHelper from "../../../../utils/helpers/ip-helper.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;
import registerUserLedger from '../contracts/register-user-ledger.js';

export default async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    let code = "00025";
    if (error.details[0].message.includes("email")) code = "00026";
    else if (error.details[0].message.includes("abha_id")) code = "00027";
    else if (error.details[0].message.includes("name")) code = "00028";
    else if (error.details[0].message.includes("eth_id")) code = "00093";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const user = await User.findOne({ eth_id: req.body.eth_id }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (!user) return res.status(400).json(errorHelper("00042", req));
  if (!user.isVerified) return res.status(400).json(errorHelper("00044"));

  const userexists = await UserRecord.findOne({ eth_id: req.body.eth_id })
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

  if (userexists) return res.status(409).json(errorHelper('00097', req));

  let username = "";
  let tempName = "";
  let existsUsername = true;
  let name = req.body.name.trim();

  const fullName = req.body.name.split(' ');
  if(fullName.length == 1) {
    req.body.firstName = fullName[0];
    req.body.lastName = "";
  } else {
    req.body.firstName = fullName[0];
    if(fullName.length > 1) {
      req.body.lastName = fullName[fullName.length - 1];
    } else {
      req.body.lastName = "";
    }
  }
  
  req.body.userName = req.body.eth_id;
  req.body.password = req.body.eth_id;

  console.log(req.body);

  await registerUserLedger(req);
  console.log("Success");

  const geo = lookup(ipHelper(req));

  let userRecord = new UserRecord({
    eth_id: user.eth_id, 
    email: req.body.email,
    name: name,
    abha_id: req.body.abha_id,
    mobile: user.mobile,
    // createdByIp: geo,
    lastLogin: Date.now(),
  });

  userRecord = await userRecord.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });

  userRecord.password = null;

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

  logger("00035", userRecord._id, getText("en", "00035"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    userRecord,
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
