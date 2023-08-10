import express from 'express';
import { PatientsController } from '../controllers/patients.controller';


const patientsRouter = express.Router();

patientsRouter.route('/login').post(
    (req, res) => new PatientsController().login(req, res)
);

patientsRouter.route('/checkUsername').post(
    (req, res) => new PatientsController().checkUsername(req, res)
);

patientsRouter.route('/checkEmail').post(
    (req, res) => new PatientsController().checkEmail(req, res)
);

patientsRouter.route('/uploadImage').post(
    (req, res) => new PatientsController().uploadImage(req, res)
);

patientsRouter.route('/register').post(
    (req, res) => new PatientsController().register(req, res)
);

export default patientsRouter;