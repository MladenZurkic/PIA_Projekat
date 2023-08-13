"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
const path = require('path');
class AppointmentsController {
    constructor() {
        this.getAllAppointmentsByDoctor = (req, res) => {
            let doctor = req.body.doctor;
            appointment_1.default.find({ doctor: doctor.username }, (err, appointments) => {
                if (err)
                    console.log(err);
                else
                    res.json(appointments);
            });
        };
        this.getAllAppointmentsByPatient = (req, res) => {
            let patient = req.body.patient;
            appointment_1.default.find({ patient: patient }, (err, appointments) => {
                if (err)
                    console.log(err);
                else
                    res.json(appointments);
            });
        };
        this.saveAppointment = (req, res) => {
            console.log("Save appointment");
            let appointment = new appointment_1.default(req.body.appointment);
            appointment.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map