import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Specialization } from "./specialization";

export class Report {
    patient: Patient;
    date: string;
    time: string;
    doctor: Doctor;
    specialization: Specialization;
    reason: string;
    diagnosis: string;
    therapy: string;
    dateOfAppointment: string;   
}