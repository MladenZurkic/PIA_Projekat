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

export default managersRouter;