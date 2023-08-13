import { Time } from "@angular/common";
import { Doctor } from "./doctor";
import { Examination } from "./examination";
import { Patient } from "./patient";

export class Appointment {
    examination: Examination;
    name: string;
    doctor: string;
    date: Date;
    time: string;
    branch: string;
    status: string;
    patient: Patient;
    reason: string;
}