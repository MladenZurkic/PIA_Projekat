import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Appointment = new Schema({
    examination: {
        type: Object
    },
    name: {
        type: String
    },
    doctor: {
        type: Object
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    branch: {
        type: String
    },
    status: {
        type: String
    },
    patient: {
        type: Object
    },
    reason: {
        type: String
    }
});

export default mongoose.model('AppointmentsModel', Appointment, 'appointments');