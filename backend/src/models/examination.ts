import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Examination = new Schema({
    specialization: {
        name: {
            type: String
        }
    },
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    status: {
        type: String
    }
});

export default mongoose.model('ExaminationModel', Examination, 'examinations');