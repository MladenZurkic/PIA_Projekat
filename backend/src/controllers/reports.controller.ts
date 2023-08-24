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


    saveReport = (req: express.Request, res: express.Response) => {
        let report = new ReportsModel(req.body.report);
        report.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        });
    }
}