import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Patient = new Schema({
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
});


export default mongoose.model('PatientModel', Patient, 'patients');