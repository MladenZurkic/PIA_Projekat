import express from 'express';
import DoctorsModel from '../models/doctor'

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
}