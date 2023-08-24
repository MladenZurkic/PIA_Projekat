"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const examination_1 = __importDefault(require("../models/examination"));
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/doctors');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });
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
        this.saveExamination = (req, res) => {
            let examination = new examination_1.default(req.body.examination);
            examination.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.uploadImage = (req, res) => {
            upload.single('profilePicture')(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    return res.json({ message: "Image upload failed." });
                }
                return res.json({ message: "Image uploaded successfully.",
                    imagePath: req.file.path });
            }));
        };
        this.checkUsername = (req, res) => {
            let username = req.body.username;
            doctor_1.default.findOne({ 'username': username }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.checkEmail = (req, res) => {
            let email = req.body.email;
            doctor_1.default.findOne({ 'email': email }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phoneNumber = req.body.phoneNumber;
            let email = req.body.email;
            let imagePath = req.body.imagePath;
            let licenceNumber = req.body.licenceNumber;
            let branch = req.body.branch;
            let specialization = req.body.specialization;
            let doctor = new doctor_1.default({ username, password, firstname, lastname, address, phoneNumber, email, imagePath, licenceNumber, branch, specialization, "examinations": [] });
            doctor.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.DoctorsController = DoctorsController;
//# sourceMappingURL=doctors.controller.js.map