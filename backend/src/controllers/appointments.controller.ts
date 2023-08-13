import express from 'express';
import AppointmentsModel from '../models/appointment'
const path = require('path');

export class AppointmentsController {

    getAllAppointmentsByDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        
        AppointmentsModel.find({doctor: doctor.username}, (err, appointments) => {
            if (err) console.log(err);
            else res.json(appointments);
        })
    }

    getAllAppointmentsByPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        AppointmentsModel.find({patient: patient}, (err, appointments) => {
            if (err) console.log(err);
            else res.json(appointments);
        })
    }

    saveAppointment = (req: express.Request, res: express.Response) => {
        console.log("Save appointment");
        let appointment = new AppointmentsModel(req.body.appointment);
        appointment.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        });
    }

}