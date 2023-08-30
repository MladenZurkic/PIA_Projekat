import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Doctor = new Schema({
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
    licenceNumber: {
        type: Number
    },
    specialization: {
        type: Object
    },
    branch: {
        type: String
    },
    examinations: {
        type: Array
    }
});

export default mongoose.model('DoctorModel', Doctor, 'doctors');