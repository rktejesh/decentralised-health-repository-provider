import { User, UserRecord, Token, Appointment } from "../../../models/index.js";
import {
    errorHelper,
    logger,
    getText,
    signAccessToken,
    signRefreshToken,
} from "../../../utils/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;
import appointmentUserLedger from './contracts/createAppointment.js';

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

    let appointment = new Appointment({
        patientId: req.user.eth_id,
        doctorId: "",
        description: req.body.description,
        hospitalId: req.body.hospitalId,
        time: Date.parse(req.body.date),
        lastLogin: Date.now(),
    });

    appointment = await appointment.save().catch((err) => {
        return res.status(500).json(errorHelper("00034", req, err.message));
    });

    req.body.appointmentId = appointment._id.toString();
    req.body.userName = req.user.eth_id;
    req.body.patientId = req.user.eth_id;
    console.log(req.body);

    await appointmentUserLedger(req);
    console.log("Success");

    return res.status(200).json({
        resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
        resultCode: "00035",
        appointment
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
