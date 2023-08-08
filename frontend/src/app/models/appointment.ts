import { Doctor } from "./doctor";
import { Examination } from "./examination";
import { Patient } from "./patient";

export class Apointment {
    examination: Examination;
    doctor: Doctor;
    date: Date;
    time: string;
    branch: string;
    status: string;
    patient: Patient;
}