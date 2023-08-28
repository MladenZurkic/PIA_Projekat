import express from 'express';
import ManagerModel from '../models/manager'
import PatientModel from '../models/patient'
import DoctorModel from '../models/doctor'
import ExaminationModel from '../models/examination'

export class ManagersController {

    login = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;

        ManagerModel.findOne({ 'username': username, 'password': password }, (err, manager) => {
            if (err) res.json({user: "", type: "none"});
            else {
                if(manager!=null){
                    res.json({user: manager, type: "manager"});
                }
                else res.json({user: "", type: "none"});
            }
        })
    }

    getAllPatients = (req: express.Request, res: express.Response) => {
        PatientModel.find({}, (err, patients) => {
            if (err) console.log(err);
            else res.json(patients);
        })
    }

    approvePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, {status: 'approved' }, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    declinePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, {status: 'declined'}, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    editPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, patient, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    deletePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.deleteOne({ 'username': patient.username }, (err) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getAllDoctors = (req: express.Request, res: express.Response) => {
        DoctorModel.find({}, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    editDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;

        DoctorModel.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    deleteDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;

        DoctorModel.deleteOne({ 'username': doctor.username }, (err) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getAllExaminations = (req: express.Request, res: express.Response) => {
        ExaminationModel.find({}, (err, examinations) => {
            if (err) console.log(err);
            else res.json(examinations);
        })
    }

    approveExamination = (req: express.Request, res: express.Response) => {
        let examination = req.body.examination;

        ExaminationModel.findOneAndUpdate({ '_id': examination._id }, {status: 'approved' }, (err, examination) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    declineExamination = (req: express.Request, res: express.Response) => {
        let examination = req.body.examination;

        ExaminationModel.findOneAndUpdate({ '_id': examination._id }, {status: 'declined'}, (err, examination) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }
}

