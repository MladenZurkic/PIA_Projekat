"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('ReportsModel', Report, 'reports');
//# sourceMappingURL=report.js.map