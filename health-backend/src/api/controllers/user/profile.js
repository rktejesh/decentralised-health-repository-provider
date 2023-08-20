import { User, UserRecord, Token } from '../../../models/index.js';
import { validateEthId, validateLogin } from '../../validators/user.validator.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import { verifyOtp, sendOtp } from '../../../utils/send-code-to-mobile.js';
import geoip from 'geoip-lite';
const { lookup } = geoip;
import ipHelper from '../../../utils/helpers/ip-helper.js';

export default async (req, res) => {
  
  const userRecord = await UserRecord.findOne({ eth_id: req.user.eth_id }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (!userRecord) return res.status(400).json(errorHelper("00042", req));

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
    user: userRecord
  });
};

/**
 * @swagger
 * /user/profile:
 *    post:
 *      summary: Profile details
 *      requestBody:
 *        description: Check is user exists
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mobile:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You logged in successfully.
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
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
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