import express from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';


const appointmentsRouter = express.Router();

appointmentsRouter.route('/getAllAppointmentsByDoctor').post(
    (req, res) => new AppointmentsController().getAllAppointmentsByDoctor(req, res)
);

appointmentsRouter.route('/getAllAppointmentsByPatient').post(
    (req, res) => new AppointmentsController().getAllAppointmentsByPatient(req, res)
);

appointmentsRouter.route('/saveAppointment').post(
    (req, res) => new AppointmentsController().saveAppointment(req, res)
);

export default appointmentsRouter;