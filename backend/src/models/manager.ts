import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Manager = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});


export default mongoose.model('ManagerModel', Manager, 'managers');