import express from 'express';
import PatientModel from '../models/patient'
import DoctorModel from '../models/doctor'
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/patients');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

export class PatientsController {

    login = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;


        PatientModel.findOne({ 'username': username, 'password': password }, (err, patient) => {
            if (err) res.json({user: "", type: "none"});
            else {
                if(patient!=null){
                    res.json({user: patient, type: "patient"});
                }
                else{
                    DoctorModel.findOne({ 'username': username, 'password': password }, (err, doctor) => {
                        if (err) res.json({user: "", type: "none"});
                        else {
                            if(doctor!=null){
                                res.json({user: doctor, type: "doctor"});
                            }
                            else res.json({user: "", type: "none"});
                        }
                    })
                }
            }
        })
    }

    checkUsername = (req: express.Request, res: express.Response) => { 
        let username = req.body.username;
        PatientModel.findOne({ 'username': username }, (err, patient) => {
            if (err) console.log(err);
            else res.json(patient);
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => { 
        let email = req.body.email;
        PatientModel.findOne({ 'email': email }, (err, patient) => {
            if (err) console.log(err);
            else res.json(patient);
        })
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

    register = (req: express.Request, res: express.Response) => {
    
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let address = req.body.address;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let imagePath = req.body.imagePath;

        let patient = new PatientModel({username, password, firstname, lastname, address, phoneNumber, email, imagePath, "status": "pending"});
        patient.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        });
    }


    getImage = (req: express.Request, res: express.Response) => {
        let imgPath = req.query.path;
        console.log(path.join(__dirname, '../../', imgPath));
        res.sendFile(path.join(__dirname, '../../', imgPath));
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let newPassword = req.body.newPassword;

        console.log(id);
        console.log(newPassword);
        PatientModel.findOneAndUpdate({ '_id': id }, {password: newPassword}, (err, response) => {
            if (err) console.log(err);
            else {
                PatientModel.findOne({ '_id': id }, (err, patient) => {
                    if (err) console.log(err);
                    else res.json({"message": "ok", "patient": patient});
                });
            }
        });
    }
}
