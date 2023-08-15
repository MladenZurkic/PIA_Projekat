import express from 'express';
import DoctorsModel from '../models/doctor'
import ExaminationModel from '../models/examination'
const path = require('path');

export class DoctorsController {

    getAllDoctors = (req: express.Request, res: express.Response) => {
        DoctorsModel.find({}, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    search = (req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let specialization = req.body.specialization;
        let branch = req.body.branch;


        DoctorsModel.find({
            'firstname': { $regex: firstname, $options: 'i' },
            'lastname': { $regex: lastname, $options: 'i' },
            'specialization.name': { $regex: specialization, $options: 'i' },
            'branch': { $regex: branch, $options: 'i' }
        }, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    getDoctorByUsername = (req: express.Request, res: express.Response) => {
        let doctorUsername = req.body.doctorUsername;

        DoctorsModel.findOne({ 'username': doctorUsername }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }
    
    getImage = (req: express.Request, res: express.Response) => {
        let imgPath = req.query.path;
        console.log(path.join(__dirname, '../../', imgPath));
        res.sendFile(path.join(__dirname, '../../', imgPath));
    }

    getAllExaminationsForSpecialization = (req: express.Request, res: express.Response) => {
        let specialization = req.body.specialization;

        ExaminationModel.find({status: "accepted", specialization: specialization}, (err, examinations) => {
            if (err) console.log(err);
            else res.json(examinations);
        })
    }

    addExaminationToDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let examination = req.body.examination;

        DoctorsModel.findOneAndUpdate({username: doctor.username}, {$push: {examinations: examination}}, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }
    
    removeExaminationFromDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let examination = req.body.examination;

        DoctorsModel.findOneAndUpdate({username: doctor.username}, {$pull: {examinations: examination}}, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }

}