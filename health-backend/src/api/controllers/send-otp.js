import { User, Token } from "../../models/index.js";
import { validateLogin } from "../validators/user.validator.js";
import {
  errorHelper,
  getText,
  logger,
} from "../../utils/index.js";
import bcrypt from "bcryptjs";
const { compare } = bcrypt;
import { verifyOtp, sendOtp } from "../../utils/send-code-to-mobile.js";

export default async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    let code = "00038";
    if (error.details[0].message.includes("mobile")) code = "00045";
    else if (error.details[0].message.includes("eth_id")) code = "00093";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const mobileExists = await User.findOne({ mobile: req.body.mobile });
  if (mobileExists) return res.status(400).json(errorHelper("00032", req));

  const user = await User.findOne({ eth_id: req.body.eth_id }).catch((err) => {
    return res.status(500).json(errorHelper("00041", req, err.message));
  });

  if (!user) return res.status(400).json(errorHelper("00096", req));

  try {
    await sendOtp(req.body.mobile).then((result) => {
      logger(
        "00048",
        req.body.mobile,
        getText("en", "00048"),
        "Info",
        req,
        req.body.mobile
      );
      return res.status(200).json({
        resultMessage: { en: getText("en", "00048") },
        resultCode: "00048",
      });
    });
  } catch (error) {
    logger("00049", "", getText("en", "00049"), error, "", req.body.mobile);
    return res.status(400).json({
      resultMessage: { en: getText("en", "00049") },
      resultCode: "00049",
    });
  }

  // if (!user)
  //   return res.status(404).json(errorHelper('00042', req));

  // if (!user.isActivated)
  //   return res.status(400).json(errorHelper('00043', req));

  // if (!user.isVerified)
  //   return res.status(400).json(errorHelper('00044', req));

  // const match = await compare(req.body.password, user.password);
  // if (!match)
  //   return res.status(400).json(errorHelper('00045', req));

  // const accessToken = signAccessToken(user._id);
  // const refreshToken = signRefreshToken(user._id);

  // if(!user) {

  // } else {

  // }

  //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
  // await Token.updateOne(
  //   { userId: user._id },
  //   {
  //     $set: {
  //       refreshToken: refreshToken,
  //       status: true,
  //       expiresIn: Date.now() + 604800000,
  //       createdAt: Date.now()
  //     },
  //   }
  // ).catch((err) => {
  //   return res.status(500).json(errorHelper('00046', req, err.message));
  // });
};

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login
 *      requestBody:
 *        description: Mobile information to login
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
