"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagersController = void 0;
const manager_1 = __importDefault(require("../models/manager"));
const patient_1 = __importDefault(require("../models/patient"));
const doctor_1 = __importDefault(require("../models/doctor"));
class ManagersController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            manager_1.default.findOne({ 'username': username, 'password': password }, (err, manager) => {
                if (err)
                    res.json({ user: "", type: "none" });
                else {
                    if (manager != null) {
                        res.json({ user: manager, type: "manager" });
                    }
                    else
                        res.json({ user: "", type: "none" });
                }
            });
        };
        this.getAllPatients = (req, res) => {
            patient_1.default.find({}, (err, patients) => {
                if (err)
                    console.log(err);
                else
                    res.json(patients);
            });
        };
        this.approvePatient = (req, res) => {
            let patient = req.body.patient;
            patient_1.default.findOneAndUpdate({ 'username': patient.username }, { status: 'approved' }, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.declinePatient = (req, res) => {
            let patient = req.body.patient;
            patient_1.default.findOneAndUpdate({ 'username': patient.username }, { status: 'declined' }, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.editPatient = (req, res) => {
            let patient = req.body.patient;
            patient_1.default.findOneAndUpdate({ 'username': patient.username }, patient, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deletePatient = (req, res) => {
            let patient = req.body.patient;
            patient_1.default.deleteOne({ 'username': patient.username }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllDoctors = (req, res) => {
            doctor_1.default.find({}, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.editDoctor = (req, res) => {
            let doctor = req.body.doctor;
            doctor_1.default.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteDoctor = (req, res) => {
            let doctor = req.body.doctor;
            doctor_1.default.deleteOne({ 'username': doctor.username }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.ManagersController = ManagersController;
//# sourceMappingURL=managers.controller.js.map