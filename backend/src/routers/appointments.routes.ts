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

appointmentsRouter.route('/cancelAppointment').post(
    (req, res) => new AppointmentsController().cancelAppointment(req, res)
);

appointmentsRouter.route('/completeAppointment').post(
    (req, res) => new AppointmentsController().completeAppointment(req, res)
);

appointmentsRouter.route('/getAllReportsByPatient').post(
    (req, res) => new AppointmentsController().getAllReportsByPatient(req, res)
);

appointmentsRouter.route('/getAllAppointmentsForPatientAndDoctor').post(
    (req, res) => new AppointmentsController().getAllAppointmentsForPatientAndDoctor(req, res)
);

export default appointmentsRouter;