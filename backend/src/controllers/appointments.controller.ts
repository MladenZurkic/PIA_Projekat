import express from 'express';
import AppointmentsModel from '../models/appointment'
import  ReportsModel from '../models/report'
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

    cancelAppointment = (req: express.Request, res: express.Response) => {
        let appointment = req.body.appointment;
        AppointmentsModel.findOneAndUpdate({_id: appointment._id}, {status: "cancelled"}, {new: true})
        .then(response => {
          if (response) {
            res.json({"message": "ok"});
          } else {
            res.status(400).json({"message": "error"});
          }
        });
    }

    getAllReportsByPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;
        console.log(patient);
        ReportsModel.find({"patient.username": patient.username}, (err, reports) => {
            if (err) console.log(err);
            else {
                console.log(reports);
                res.json(reports);
            }
        })
    }
}