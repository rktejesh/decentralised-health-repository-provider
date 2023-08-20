import mongoose from "mongoose";
const { Schema, model } = mongoose;

const hospitalRecordSchema = new Schema(
    {
        name: {
            type: String,
        },
        eth_id: {
            type: String,
            required: true,
        },
        registrationId: {
            type: String,
        },
        mobile: {
            type: String,
        },
        //NOTE: To check whether the account is active or not. When user deletes the account, you can store the information anonymously.
        isActivated: {
            type: Boolean,
            default: true,
        },
        //NOTE: To check whether the user skipped the email-verification step or not. You can delete the unverified accounts day by day.
        isVerified: {
            type: Boolean,
        },
        deviceId: {
            type: String,
        },
        //NOTE: You can add more options acc. to your need.
        platform: {
            type: String,
            enum: ["Android", "IOS"],
        },
        createdByIp: {
            type: String,
        },
        //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const HospitalRecord = model("HospitalRecord", hospitalRecordSchema);
export default HospitalRecord;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         type:
 *           type: string
 *           enum: ['user', 'admin', 'creator', 'reader']
 *         language:
 *           type: string
 *           enum: ['tr', 'en']
 *         isPremium:
 *           type: boolean
 *         gender:
 *           type: string
 *           enum: ['male', 'female', 'other']
 *         countryCode:
 *           type: string
 *         timezone:
 *           type: number
 *         birthDate:
 *           type: string
 *         photoUrl:
 *           type: string
 *         isActivated:
 *           type: boolean
 *         isVerified:
 *           type: boolean
 *         deviceId:
 *           type: string
 *         platform:
 *           type: string
 *           enum: ['Android', 'IOS']
 *         deletedAt:
 *           type: string
 */
