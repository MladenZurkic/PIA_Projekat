"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_controller_1 = require("../controllers/patients.controller");
const patientsRouter = express_1.default.Router();
patientsRouter.route('/login').post((req, res) => new patients_controller_1.PatientsController().login(req, res));
patientsRouter.route('/checkUsername').post((req, res) => new patients_controller_1.PatientsController().checkUsername(req, res));
patientsRouter.route('/checkEmail').post((req, res) => new patients_controller_1.PatientsController().checkEmail(req, res));
patientsRouter.route('/uploadImage').post((req, res) => new patients_controller_1.PatientsController().uploadImage(req, res));
patientsRouter.route('/register').post((req, res) => new patients_controller_1.PatientsController().register(req, res));
patientsRouter.route('/getImage').get((req, res) => new patients_controller_1.PatientsController().getImage(req, res));
exports.default = patientsRouter;
//# sourceMappingURL=patients.routes.js.map