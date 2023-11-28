import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DocRequestSchema = new Schema(
    {
        docId: {
            type: String,
            required: true
        },
        patientId: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
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

const DocRequest = model("DocRequest", DocRequestSchema);
export default DocRequest;
