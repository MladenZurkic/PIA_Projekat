"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managers_controller_1 = require("../controllers/managers.controller");
const managersRouter = express_1.default.Router();
managersRouter.route('/login').post((req, res) => new managers_controller_1.ManagersController().login(req, res));
managersRouter.route('/getAllPatients').get((req, res) => new managers_controller_1.ManagersController().getAllPatients(req, res));
managersRouter.route('/approvePatient').post((req, res) => new managers_controller_1.ManagersController().approvePatient(req, res));
managersRouter.route('/declinePatient').post((req, res) => new managers_controller_1.ManagersController().declinePatient(req, res));
managersRouter.route('/editPatient').post((req, res) => new managers_controller_1.ManagersController().editPatient(req, res));
managersRouter.route('/deletePatient').post((req, res) => new managers_controller_1.ManagersController().deletePatient(req, res));
managersRouter.route('/getAllDoctors').get((req, res) => new managers_controller_1.ManagersController().getAllDoctors(req, res));
managersRouter.route('/editDoctor').post((req, res) => new managers_controller_1.ManagersController().editDoctor(req, res));
managersRouter.route('/deleteDoctor').post((req, res) => new managers_controller_1.ManagersController().deleteDoctor(req, res));
managersRouter.route('/getAllExaminations').get((req, res) => new managers_controller_1.ManagersController().getAllExaminations(req, res));
managersRouter.route('/approveExamination').post((req, res) => new managers_controller_1.ManagersController().approveExamination(req, res));
managersRouter.route('/declineExamination').post((req, res) => new managers_controller_1.ManagersController().declineExamination(req, res));
managersRouter.route('/getAllSpecializations').get((req, res) => new managers_controller_1.ManagersController().getAllSpecializations(req, res));
managersRouter.route('/addSpecialization').post((req, res) => new managers_controller_1.ManagersController().addSpecialization(req, res));
managersRouter.route('/editExamination').post((req, res) => new managers_controller_1.ManagersController().editExamination(req, res));
managersRouter.route('/addExamination').post((req, res) => new managers_controller_1.ManagersController().addExamination(req, res));
managersRouter.route('/deleteExamination').post((req, res) => new managers_controller_1.ManagersController().deleteExamination(req, res));
managersRouter.route('/changePassword').post((req, res) => new managers_controller_1.ManagersController().changePassword(req, res));
exports.default = managersRouter;
//# sourceMappingURL=managers.routes.js.map