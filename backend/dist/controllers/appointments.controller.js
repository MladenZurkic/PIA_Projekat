"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
const report_1 = __importDefault(require("../models/report"));
const path = require('path');
class AppointmentsController {
    constructor() {
        this.getAllAppointmentsByDoctor = (req, res) => {
            let doctor = req.body.doctor;
            appointment_1.default.find({ "doctor.username": doctor.username }, (err, appointments) => {
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
        this.cancelAppointment = (req, res) => {
            let appointment = req.body.appointment;
            appointment_1.default.findOneAndUpdate({ _id: appointment._id }, { status: "cancelled" }, { new: true })
                .then(response => {
                if (response) {
                    res.json({ "message": "ok" });
                }
                else {
                    res.status(400).json({ "message": "error" });
                }
            });
        };
        this.completeAppointment = (req, res) => {
            let appointment = req.body.appointment;
            appointment_1.default.findOneAndUpdate({ _id: appointment._id }, { status: "completed" }, { new: true })
                .then(response => {
                if (response) {
                    res.json({ "message": "ok" });
                }
                else {
                    res.status(400).json({ "message": "error" });
                }
            });
        };
        this.getAllReportsByPatient = (req, res) => {
            let patient = req.body.patient;
            console.log(patient);
            report_1.default.find({ "patient.username": patient.username }, (err, reports) => {
                if (err)
                    console.log(err);
                else {
                    console.log(reports);
                    res.json(reports);
                }
            });
        };
        this.getAllAppointmentsForPatientAndDoctor = (req, res) => {
            let patient = req.body.patient;
            let doctor = req.body.doctor;
            appointment_1.default.find({ "patient.username": patient.username, "doctor.username": doctor.username }, (err, appointments) => {
                if (err)
                    console.log(err);
                else
                    res.json(appointments);
            });
        };
    }
}
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map