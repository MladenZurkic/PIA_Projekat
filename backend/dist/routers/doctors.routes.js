"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("../controllers/doctors.controller");
const doctorsRouter = express_1.default.Router();
doctorsRouter.route('/getAllDoctors').get((req, res) => new doctors_controller_1.DoctorsController().getAllDoctors(req, res));
doctorsRouter.route('/search').post((req, res) => new doctors_controller_1.DoctorsController().search(req, res));
doctorsRouter.route('/getDoctorByUsername').post((req, res) => new doctors_controller_1.DoctorsController().getDoctorByUsername(req, res));
doctorsRouter.route('/getImage').get((req, res) => new doctors_controller_1.DoctorsController().getImage(req, res));
doctorsRouter.route('/getAllExaminationsForSpecialization').post((req, res) => new doctors_controller_1.DoctorsController().getAllExaminationsForSpecialization(req, res));
doctorsRouter.route('/addExaminationToDoctor').post((req, res) => new doctors_controller_1.DoctorsController().addExaminationToDoctor(req, res));
doctorsRouter.route('/removeExaminationFromDoctor').post((req, res) => new doctors_controller_1.DoctorsController().removeExaminationFromDoctor(req, res));
doctorsRouter.route('/saveExamination').post((req, res) => new doctors_controller_1.DoctorsController().saveExamination(req, res));
doctorsRouter.route('/uploadImage').post((req, res) => new doctors_controller_1.DoctorsController().uploadImage(req, res));
doctorsRouter.route('/checkUsername').post((req, res) => new doctors_controller_1.DoctorsController().checkUsername(req, res));
doctorsRouter.route('/checkEmail').post((req, res) => new doctors_controller_1.DoctorsController().checkEmail(req, res));
doctorsRouter.route('/register').post((req, res) => new doctors_controller_1.DoctorsController().register(req, res));
doctorsRouter.route('/changePassword').post((req, res) => new doctors_controller_1.DoctorsController().changePassword(req, res));
exports.default = doctorsRouter;
//# sourceMappingURL=doctors.routes.js.map