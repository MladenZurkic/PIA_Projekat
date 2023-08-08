"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
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
            console.log(firstname, lastname, specialization, branch);
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
    }
}
exports.DoctorsController = DoctorsController;
//# sourceMappingURL=doctors.controller.js.map