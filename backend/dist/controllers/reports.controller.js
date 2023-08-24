"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const report_1 = __importDefault(require("../models/report"));
class ReportsController {
    constructor() {
        this.getAllReportsForPatient = (req, res) => {
            let patient = req.body.patient;
            report_1.default.find({ "patient.username": patient.username }, (err, reports) => {
                if (err)
                    console.log(err);
                else
                    res.json(reports);
            });
        };
        this.saveReport = (req, res) => {
            let report = new report_1.default(req.body.report);
            report.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map