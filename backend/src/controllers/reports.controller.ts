import express from 'express';
import ReportsModel from '../models/report'

export class ReportsController {

    getAllReportsForPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        ReportsModel.find({ "patient.username": patient.username }, (err, reports) => {
            if (err) console.log(err);
            else res.json(reports);
        });

    }
}