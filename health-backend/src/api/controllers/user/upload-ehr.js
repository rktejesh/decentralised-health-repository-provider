import { Doc } from '../../../models/index.js';
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from '../../../utils/index.js';
import uploadEhrLedger from './contracts/upload-ehr-ledger.js';

export default async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  
  let doc = new Doc({
    patient_id: req.user.eth_id,
    doc_type: "EHR",
    filename: req.file.filename,
    filepath: req.file.filepath
  });
  doc = await doc.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });
  
  req.body.ehrId = doc._id;
  req.body.userName = req.user.eth_id;
  req.body.patientId = req.user.eth_id;

  await uploadEhrLedger(req);

  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    resultCode: "00035",
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