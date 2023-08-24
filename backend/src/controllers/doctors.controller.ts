import express from 'express';
import DoctorModel from '../models/doctor'
import ExaminationModel from '../models/examination'
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/doctors');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });


export class DoctorsController {

    getAllDoctors = (req: express.Request, res: express.Response) => {
        DoctorModel.find({}, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    search = (req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let specialization = req.body.specialization;
        let branch = req.body.branch;


        DoctorModel.find({
            'firstname': { $regex: firstname, $options: 'i' },
            'lastname': { $regex: lastname, $options: 'i' },
            'specialization.name': { $regex: specialization, $options: 'i' },
            'branch': { $regex: branch, $options: 'i' }
        }, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    getDoctorByUsername = (req: express.Request, res: express.Response) => {
        let doctorUsername = req.body.doctorUsername;

        DoctorModel.findOne({ 'username': doctorUsername }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }
    
    getImage = (req: express.Request, res: express.Response) => {
        let imgPath = req.query.path;
        console.log(path.join(__dirname, '../../', imgPath));
        res.sendFile(path.join(__dirname, '../../', imgPath));
    }

    getAllExaminationsForSpecialization = (req: express.Request, res: express.Response) => {
        let specialization = req.body.specialization;

        ExaminationModel.find({status: "accepted", specialization: specialization}, (err, examinations) => {
            if (err) console.log(err);
            else res.json(examinations);
        })
    }

    addExaminationToDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let examination = req.body.examination;

        DoctorModel.findOneAndUpdate({username: doctor.username}, {$push: {examinations: examination}}, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }
    
    removeExaminationFromDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let examination = req.body.examination;

        DoctorModel.findOneAndUpdate({username: doctor.username}, {$pull: {examinations: examination}}, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }

    saveExamination = (req: express.Request, res: express.Response) => {
        let examination = new ExaminationModel(req.body.examination);
        examination.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        });
    }

    uploadImage = (req: express.Request, res: express.Response) => {
        
        upload.single('profilePicture')(req, res, async (err) => {

            if (err) {
                console.log(err);
              return res.json({ message: "Image upload failed." });
            }

            return res.json({ message: "Image uploaded successfully.",
            imagePath: req.file.path});
        });
    }

    checkUsername = (req: express.Request, res: express.Response) => { 
        let username = req.body.username;
        DoctorModel.findOne({ 'username': username }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => { 
        let email = req.body.email;
        DoctorModel.findOne({ 'email': email }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor);
        })
    }

    register = (req: express.Request, res: express.Response) => {
    
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let imagePath = req.body.imagePath;
        let licenceNumber = req.body.licenceNumber;
        let branch = req.body.branch;
        let specialization = req.body.specialization;

        let doctor = new DoctorModel({username, password, firstname, lastname, address, phoneNumber, email, imagePath, licenceNumber, branch, specialization, "examinations": []});
        doctor.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        });
    }
}