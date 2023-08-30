"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagersController = void 0;
const manager_1 = __importDefault(require("../models/manager"));
const patient_1 = __importDefault(require("../models/patient"));
const doctor_1 = __importDefault(require("../models/doctor"));
const examination_1 = __importDefault(require("../models/examination"));
const specialization_1 = __importDefault(require("../models/specialization"));
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
            let selectedSpecialization = req.body.selectedSpecialization;
            specialization_1.default.find({ name: selectedSpecialization }, (err, specializationfromDB) => {
                if (err)
                    console.log(err);
                else {
                    doctor.specialization = specializationfromDB[0];
                    doctor_1.default.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, patient) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ "message": "ok" });
                    });
                }
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
        this.getAllExaminations = (req, res) => {
            examination_1.default.find({}, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.approveExamination = (req, res) => {
            let examination = req.body.examination;
            examination_1.default.findOneAndUpdate({ '_id': examination._id }, { status: 'approved' }, (err, examination) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.declineExamination = (req, res) => {
            let examination = req.body.examination;
            examination_1.default.findOneAndUpdate({ '_id': examination._id }, { status: 'declined' }, (err, examination) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllSpecializations = (req, res) => {
            specialization_1.default.find({}, (err, specializations) => {
                if (err)
                    console.log(err);
                else
                    res.json(specializations);
            });
        };
        this.addSpecialization = (req, res) => {
            let name = req.body.name;
            let specialization = new specialization_1.default(req.body);
            specialization.save().then((specialization) => {
                res.status(200).json({ 'message': 'ok' });
            }).catch((err) => {
                res.status(400).json({ 'message': "none" });
            });
        };
        this.addExamination = (req, res) => {
            let name = req.body.name;
            let price = req.body.price;
            let duration = req.body.duration;
            let specializationName = req.body.specializationName;
            specialization_1.default.findOne({ 'name': specializationName }, (err, specialization) => {
                if (err)
                    console.log(err);
                else {
                    let examination = new examination_1.default({ name: name, price: price, duration: duration, specialization: specialization, status: "accepted" });
                    examination.save().then((examination) => {
                        res.status(200).json({ 'message': 'ok' });
                    }).catch((err) => {
                        res.status(400).json({ 'message': "none" });
                    });
                }
            });
        };
        this.deleteExamination = (req, res) => {
            let newExamination = req.body.examination;
            examination_1.default.updateOne({ '_id': newExamination._id }, { status: 'deleted' }, (err, examinationFromDB) => {
                if (err)
                    console.log(err);
                else {
                    //Need to update all doctor's examinations with this examination
                    console.log(newExamination._id);
                    doctor_1.default.find({}, (err, doctors) => {
                        if (err)
                            console.log(err);
                        else {
                            let updateRequired = false;
                            doctors.forEach(doctor => {
                                updateRequired = false;
                                let examinations = doctor.examinations;
                                examinations.forEach(examination => {
                                    if (examination._id == newExamination._id) {
                                        examination.status = "deleted";
                                        updateRequired = true;
                                    }
                                });
                                if (updateRequired) {
                                    doctor_1.default.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, doctor) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            console.log("ok for doctor " + doctor.username);
                                    });
                                }
                            });
                            res.json({ "message": "ok" });
                        }
                    });
                }
            });
        };
        this.editExamination = (req, res) => {
            let newExamination = req.body.examination;
            examination_1.default.updateOne({ '_id': newExamination._id }, {
                name: newExamination.name,
                price: newExamination.price,
                duration: newExamination.duration,
                specialization: newExamination.specialization
            }, (err, response) => {
                if (err)
                    console.log(err);
                else {
                    //Need to update all doctor's examinations with this examination
                    doctor_1.default.find({}, (err, doctors) => {
                        if (err)
                            console.log(err);
                        else {
                            let updateRequired = false;
                            doctors.forEach(doctor => {
                                updateRequired = false;
                                let examinations = doctor.examinations;
                                examinations.forEach(examination => {
                                    if (examination._id == newExamination._id) {
                                        examination.name = newExamination.name;
                                        examination.duration = newExamination.duration;
                                        examination.price = newExamination.price;
                                        examination.specialization = newExamination.specialization;
                                        updateRequired = true;
                                    }
                                });
                                if (updateRequired) {
                                    doctor_1.default.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, doctor) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            console.log("ok for doctor " + doctor.username);
                                    });
                                }
                            });
                            res.json({ "message": "ok" });
                        }
                    });
                }
            });
        };
        this.changePassword = (req, res) => {
            let id = req.body.id;
            let newPassword = req.body.newPassword;
            console.log(id);
            console.log(newPassword);
            manager_1.default.findOneAndUpdate({ '_id': id }, { password: newPassword }, (err, response) => {
                if (err)
                    console.log(err);
                else {
                    manager_1.default.findOne({ '_id': id }, (err, manager) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ "message": "ok", "manager": manager });
                    });
                }
            });
        };
    }
}
exports.ManagersController = ManagersController;
//# sourceMappingURL=managers.controller.js.map