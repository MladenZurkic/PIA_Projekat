"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_controller_1 = require("../controllers/appointments.controller");
const appointmentsRouter = express_1.default.Router();
appointmentsRouter.route('/getAllAppointmentsByDoctor').post((req, res) => new appointments_controller_1.AppointmentsController().getAllAppointmentsByDoctor(req, res));
appointmentsRouter.route('/getAllAppointmentsByPatient').post((req, res) => new appointments_controller_1.AppointmentsController().getAllAppointmentsByPatient(req, res));
appointmentsRouter.route('/saveAppointment').post((req, res) => new appointments_controller_1.AppointmentsController().saveAppointment(req, res));
appointmentsRouter.route('/cancelAppointment').post((req, res) => new appointments_controller_1.AppointmentsController().cancelAppointment(req, res));
appointmentsRouter.route('/completeAppointment').post((req, res) => new appointments_controller_1.AppointmentsController().completeAppointment(req, res));
appointmentsRouter.route('/getAllReportsByPatient').post((req, res) => new appointments_controller_1.AppointmentsController().getAllReportsByPatient(req, res));
appointmentsRouter.route('/getAllAppointmentsForPatientAndDoctor').post((req, res) => new appointments_controller_1.AppointmentsController().getAllAppointmentsForPatientAndDoctor(req, res));
exports.default = appointmentsRouter;
//# sourceMappingURL=appointments.routes.js.map