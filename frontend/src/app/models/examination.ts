import { Specialization } from "./specialization";

export class Examination {
    _id: string;
    name: string;
    duration: number;
    price: number;
    specialization: Specialization;
    status: string;
}