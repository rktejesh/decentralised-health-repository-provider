import { User, Token, UserRecord } from "../../../../models/index.js";
import {
  validateVerifyEmail,
  validateVerifyMobile,
} from "../../../validators/user.validator.js";
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import ipHelper from "../../../../utils/helpers/ip-helper.js";
import { jwtSecretKey } from "../../../../config/index.js";
import pkg from "jsonwebtoken";
import { verifyOtp, sendOtp } from "../../../../utils/send-code-to-mobile.js";
const { verify } = pkg;
import geoip from "geoip-lite";
import { response } from "express";
const { lookup } = geoip;

export default async (req, res) => {
  const eth_id = req.body.eth_id;
  const mobile = req.body.mobile;
  const code = req.body.code;
  const { error } = validateVerifyMobile(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00053", req, error.details[0].message));

  try {
    await verifyOtp(mobile, code).then(async (result) => {
      const user = await User.findOne({ eth_id: eth_id }).catch((err) => {
        return res.status(500).json(errorHelper("00041", req, err.message));
      });

      // logger("00048", "", getText("en", "00048"), "Info", "", mobile);

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            mobile: mobile,
            isVerified: true,
          },
        },
        {
          upsert: true,
        }
      ).catch((err) => {
        logger(
          "00035",
          user._id,
          getText("en", "00035"),
          err,
          req,
          req.body.mobile
        );

        return res.status(500).json(errorHelper("00057", req, err.message));
      });

      // if (!user) {
      //   const geo = lookup(ipHelper(req));
      //   user = new User({
      //     mobile: req.body.mobile,
      //     lastLogin: Date.now(),
      //   });

      //   user = await user.save().catch((err) => {
      //     console.log(err);
      //     logger("00035",user._id, getText("en", "00035"), err, req,req.body.mobile);
      //     return res.status(500).json(errorHelper("00034", req, err.message));
      //   });
      // }

      // let userRecord = await UserRecord.findOne({ _id: user._id }).catch(
      //   (err) => {
      //     return res.status(500).json(errorHelper("00041", req, err.message));
      //   }
      // );

      // const exists = !user ? false : true;

      // const accessToken = signAccessToken(user._id);
      // const refreshToken = signRefreshToken(user._id);
      // await Token.updateOne(
      //   { userId: user._id },
      //   {
      //     $set: {
      //       userId: user._id,
      //       refreshToken: refreshToken,
      //       status: true,
      //       expires: Date.now() + 604800000,
      //       createdAt: Date.now(),
      //       createdByIp: ipHelper(req),
      //     },
      //   },
      //   {
      //     upsert: true,
      //   }
      // ).catch((err) => {

      //   logger("00035", user._id, getText("en", "00035"),err, req,req.body.mobile);
      //   return res.status(500).json(errorHelper("00057", req, err.message));
      // });

      logger(
        "00035",
        user._id,
        getText("en", "00035"),
        "Info",
        req,
        req.body.mobile
      );

      return res.status(200).json({
        resultMessage: {
          en: getText("en", "00058"),
          tr: getText("tr", "00058"),
        },
        resultCode: "00035",
        user,
        confirmStatus: result,
      });
    });
  } catch (error) {
    console.log(error);
    logger("00035", "", getText("en", "00035"), error, req, req.body.mobile);
    return res.status(400).json({
      resultMessage: { en: getText("en", "00049") },
      resultCode: "00049",
    });
  }
};

/**
 * @swagger
 * /user/verify-email:
 *    post:
 *      summary: Verifies the email address of the user.
 *      requestBody:
 *        description: Confirm code and confirm token.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                code:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your email address was verified successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please send a verification code.
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
