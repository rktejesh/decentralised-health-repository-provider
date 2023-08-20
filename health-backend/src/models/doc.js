import mongoose from "mongoose";
const { Schema, model } = mongoose;

const docSchema = new Schema(
    {
        patient_id: {
            type: String,
            required: true
        },
        doc_type: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        filepath: {
            type: String,
            required: true
        },
        hospital: {
            type: String,
        },
        doctor: {
            type: String
        },
        date: {
            type: String
        },
        requestAccess: {
            type: Boolean
        },
        grantAccess: {
            type: Boolean
        },
    },
    {
        timestamps: true,
    }
);

const Doc = model("Doc", docSchema);
export default Doc;

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
