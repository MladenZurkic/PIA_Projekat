"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('DoctorModel', Doctor, 'doctors');
//# sourceMappingURL=doctor.js.map