"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('AppointmentsModel', Appointment, 'appointments');
//# sourceMappingURL=appointment.js.map