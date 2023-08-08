import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Specialization } from "./specialization";

export class Report {
    patient: Patient;
    date: Date;
    time: string;
    doctor: Doctor;
    specialization: Specialization;
    description: string;
    diagnosis: string;
    therapy: string;
    dateOfAppointment: Date;   
}