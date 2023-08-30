import express from 'express';
import { ManagersController } from '../controllers/managers.controller';


const managersRouter = express.Router();

managersRouter.route('/login').post(
    (req, res) => new ManagersController().login(req, res)
);

managersRouter.route('/getAllPatients').get(
    (req, res) => new ManagersController().getAllPatients(req, res)
);

managersRouter.route('/approvePatient').post(
    (req, res) => new ManagersController().approvePatient(req, res)
);

managersRouter.route('/declinePatient').post(
    (req, res) => new ManagersController().declinePatient(req, res)
);

managersRouter.route('/editPatient').post(
    (req, res) => new ManagersController().editPatient(req, res)
);

managersRouter.route('/deletePatient').post(
    (req, res) => new ManagersController().deletePatient(req, res)
);

managersRouter.route('/getAllDoctors').get(
    (req, res) => new ManagersController().getAllDoctors(req, res)
);

managersRouter.route('/editDoctor').post(
    (req, res) => new ManagersController().editDoctor(req, res)
);

managersRouter.route('/deleteDoctor').post(
    (req, res) => new ManagersController().deleteDoctor(req, res)
);

managersRouter.route('/getAllExaminations').get(
    (req, res) => new ManagersController().getAllExaminations(req, res)
);

managersRouter.route('/approveExamination').post(
    (req, res) => new ManagersController().approveExamination(req, res)
);

managersRouter.route('/declineExamination').post(
    (req, res) => new ManagersController().declineExamination(req, res)
);

managersRouter.route('/getAllSpecializations').get(
    (req, res) => new ManagersController().getAllSpecializations(req, res)
);

managersRouter.route('/addSpecialization').post(
    (req, res) => new ManagersController().addSpecialization(req, res)
);

managersRouter.route('/editExamination').post(
    (req, res) => new ManagersController().editExamination(req, res)
);

managersRouter.route('/addExamination').post(
    (req, res) => new ManagersController().addExamination(req, res)
);

managersRouter.route('/deleteExamination').post(
    (req, res) => new ManagersController().deleteExamination(req, res)
);

managersRouter.route('/changePassword').post(
    (req, res) => new ManagersController().changePassword(req, res)
);
export default managersRouter;