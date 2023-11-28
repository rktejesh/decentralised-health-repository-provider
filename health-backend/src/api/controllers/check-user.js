import { User, UserRecord, Token, DoctorRecord, HospitalRecord } from '../../models/index.js';
import { validateCheckUser } from '../validators/user.validator.js';
import { ipHelper, errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import geoip from 'geoip-lite';
const { lookup } = geoip;

export default async (req, res) => {
  const eth_id = req.query.eth_id.toLowerCase();
  const type = req.query.type;
  const { error } = validateCheckUser(req.query);
  if (error) {
    let code = '00038';
    if (error.details[0].message.includes('eth_id'))
      code = '00093';
    else if (error.details[0].message.includes('type'))
      code = '00098'
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }


  let user = await User.findOne({ eth_id: eth_id, type : type }).catch(
    (err) => {
      return res.status(500).json(errorHelper("00041", req, err.message));
    }
  );


  if (!user) {
    const geo = lookup(ipHelper(req));

    user = new User({
      eth_id: eth_id,
      type: type,
      lastLogin: Date.now(),
    });

    user = await user.save().catch((err) => {
      return res.status(500).json(errorHelper("00034", req, err.message));
    });
  }

  let exists = false;

  console.log(type);

  if (type === "Patient") {
    let userRecord = await UserRecord.findOne({ eth_id: eth_id }).catch(
      (err) => {
        return res.status(500).json(errorHelper("00041", req, err.message));
      }
    );

    exists = (!userRecord) ? false : true;
  }

  if (type === "Doctor") {
    let doctorRecord = await DoctorRecord.findOne({ eth_id: eth_id }).catch(
      (err) => {
        return res.status(500).json(errorHelper("00041", req, err.message));
      }
    );

    exists = (!doctorRecord) ? false : true;
  }

  if (type === "Hospital") {
    let hospitalRecord = await HospitalRecord.findOne({ eth_id: eth_id }).catch(
      (err) => {
        return res.status(500).json(errorHelper("00041", req, err.message));
      }
    );

    exists = (!hospitalRecord) ? false : true;
  }

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
      },
    },
    {
      upsert: true,
    }
  ).catch((err) => {
    logger("00035", user._id, getText("en", "00035"), err, req, req.body.mobile);
    return res.status(500).json(errorHelper("00057", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00095') },
    resultCode: '00095',
    eth_id: eth_id,
    ifUserExists: exists,
    accessToken,
    refreshToken,
    user
  });
};

/**
 * @swagger
 * /user/check-user-exists:
 *    post:
 *      summary: Login
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