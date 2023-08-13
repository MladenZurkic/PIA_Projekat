import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Report = new Schema({
    patient: {
        type: Object
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    doctor: {
        type: String
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
    dateOfNextAppointment: {
        type: String
    }
});

export default mongoose.model('ReportsModel', Report, 'reports');