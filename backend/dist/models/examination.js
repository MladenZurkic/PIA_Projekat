"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Examination = new Schema({
    specialization: {
        name: {
            type: String
        }
    },
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ExaminationModel', Examination, 'examinations');
//# sourceMappingURL=examination.js.map