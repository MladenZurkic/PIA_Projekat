import { Examination } from "./examination";
import { Specialization } from "./specialization";

export class Doctor {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    phoneNumber: string;
    email: string;
    imagePath: string;
    licenceNumber: number;
    specialization: Specialization;
    branch: string;
    examinations: Examination[];
}