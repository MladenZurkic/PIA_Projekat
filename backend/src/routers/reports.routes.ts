import express from 'express';
import { ReportsController } from '../controllers/reports.controller';


const reportsRouter = express.Router();

reportsRouter.route('/getAllReportsForPatient').post(
    (req, res) => new ReportsController().getAllReportsForPatient(req, res)
);
export default reportsRouter;