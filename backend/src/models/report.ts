import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Report = new Schema({
    patient: {
        username: {
            type: String
        },
        password: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String
        },
        imagePath: {
            type: String
        },
        status: {
            type: String
        }
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    doctor: {
        type: Object
    },
    specialization: {
        name: {
            type: String
        }
    },
    reason: {
        type: String
    },
    diagnosis: {
        type: String
    },
    therapy: {
        type: String
    },
    dateOfAppointment: {
        type: String
    },
});

export default mongoose.model('ReportsModel', Report, 'reports');