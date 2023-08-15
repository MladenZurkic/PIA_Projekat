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
exports.PatientsController = void 0;
const patient_1 = __importDefault(require("../models/patient"));
const doctor_1 = __importDefault(require("../models/doctor"));
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/patients');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });
class PatientsController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            patient_1.default.findOne({ 'username': username, 'password': password }, (err, patient) => {
                if (err)
                    res.json({ user: "", type: "none" });
                else {
                    if (patient != null) {
                        res.json({ user: patient, type: "patient" });
                    }
                    else {
                        doctor_1.default.findOne({ 'username': username, 'password': password }, (err, doctor) => {
                            if (err)
                                res.json({ user: "", type: "none" });
                            else {
                                if (doctor != null) {
                                    res.json({ user: doctor, type: "doctor" });
                                }
                                else
                                    res.json({ user: "", type: "none" });
                            }
                        });
                    }
                }
            });
        };
        this.checkUsername = (req, res) => {
            let username = req.body.username;
            patient_1.default.findOne({ 'username': username }, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json(patient);
            });
        };
        this.checkEmail = (req, res) => {
            let email = req.body.email;
            patient_1.default.findOne({ 'email': email }, (err, patient) => {
                if (err)
                    console.log(err);
                else
                    res.json(patient);
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
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phoneNumber = req.body.phoneNumber;
            let email = req.body.email;
            let imagePath = req.body.imagePath;
            let patient = new patient_1.default({ username, password, firstname, lastname, address, phoneNumber, email, imagePath, "status": "pending" });
            patient.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getImage = (req, res) => {
            let imgPath = req.query.path;
            console.log(path.join(__dirname, '../../', imgPath));
            res.sendFile(path.join(__dirname, '../../', imgPath));
        };
    }
}
exports.PatientsController = PatientsController;
//# sourceMappingURL=patients.controller.js.map