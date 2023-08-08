"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("../controllers/doctors.controller");
const doctorsRouter = express_1.default.Router();
doctorsRouter.route('/getAllDoctors').get((req, res) => new doctors_controller_1.DoctorsController().getAllDoctors(req, res));
doctorsRouter.route('/search').post((req, res) => new doctors_controller_1.DoctorsController().search(req, res));
exports.default = doctorsRouter;
//# sourceMappingURL=doctors.routes.js.map