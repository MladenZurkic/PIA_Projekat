"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('ReportsModel', Report, 'reports');
//# sourceMappingURL=report.js.map