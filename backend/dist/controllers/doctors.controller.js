"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const examination_1 = __importDefault(require("../models/examination"));
const path = require('path');
class DoctorsController {
    constructor() {
        this.getAllDoctors = (req, res) => {
            doctor_1.default.find({}, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.search = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let specialization = req.body.specialization;
            let branch = req.body.branch;
            doctor_1.default.find({
                'firstname': { $regex: firstname, $options: 'i' },
                'lastname': { $regex: lastname, $options: 'i' },
                'specialization.name': { $regex: specialization, $options: 'i' },
                'branch': { $regex: branch, $options: 'i' }
            }, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.getDoctorByUsername = (req, res) => {
            let doctorUsername = req.body.doctorUsername;
            doctor_1.default.findOne({ 'username': doctorUsername }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.getImage = (req, res) => {
            let imgPath = req.query.path;
            console.log(path.join(__dirname, '../../', imgPath));
            res.sendFile(path.join(__dirname, '../../', imgPath));
        };
        this.getAllExaminationsForSpecialization = (req, res) => {
            let specialization = req.body.specialization;
            examination_1.default.find({ status: "accepted", specialization: specialization }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.addExaminationToDoctor = (req, res) => {
            let doctor = req.body.doctor;
            let examination = req.body.examination;
            doctor_1.default.findOneAndUpdate({ username: doctor.username }, { $push: { examinations: examination } }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.removeExaminationFromDoctor = (req, res) => {
            let doctor = req.body.doctor;
            let examination = req.body.examination;
            doctor_1.default.findOneAndUpdate({ username: doctor.username }, { $pull: { examinations: examination } }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
    }
}
exports.DoctorsController = DoctorsController;
//# sourceMappingURL=doctors.controller.js.map