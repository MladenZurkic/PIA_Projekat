import express from 'express';
import { DoctorsController } from '../controllers/doctors.controller';


const doctorsRouter = express.Router();

doctorsRouter.route('/getAllDoctors').get(
    (req, res) => new DoctorsController().getAllDoctors(req, res)
);

doctorsRouter.route('/search').post(
    (req, res) => new DoctorsController().search(req, res)
);

doctorsRouter.route('/getDoctorByUsername').post(
    (req, res) => new DoctorsController().getDoctorByUsername(req, res)
);


doctorsRouter.route('/getImage').get(
    (req, res) => new DoctorsController().getImage(req, res)
);
export default doctorsRouter;