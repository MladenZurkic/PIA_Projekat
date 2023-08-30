import express from 'express';
import ManagerModel from '../models/manager'
import PatientModel from '../models/patient'
import DoctorModel from '../models/doctor'
import ExaminationModel from '../models/examination'
import SpecializationModel from '../models/specialization'

export class ManagersController {

    login = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;

        ManagerModel.findOne({ 'username': username, 'password': password }, (err, manager) => {
            if (err) res.json({user: "", type: "none"});
            else {
                if(manager!=null){
                    res.json({user: manager, type: "manager"});
                }
                else res.json({user: "", type: "none"});
            }
        })
    }

    getAllPatients = (req: express.Request, res: express.Response) => {
        PatientModel.find({}, (err, patients) => {
            if (err) console.log(err);
            else res.json(patients);
        })
    }

    approvePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, {status: 'approved' }, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    declinePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, {status: 'declined'}, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    editPatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.findOneAndUpdate({ 'username': patient.username }, patient, (err, patient) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    deletePatient = (req: express.Request, res: express.Response) => {
        let patient = req.body.patient;

        PatientModel.deleteOne({ 'username': patient.username }, (err) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getAllDoctors = (req: express.Request, res: express.Response) => {
        DoctorModel.find({}, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors);
        })
    }

    editDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let selectedSpecialization = req.body.selectedSpecialization;

        SpecializationModel.find({name: selectedSpecialization}, (err, specializationfromDB) => {
            if (err) console.log(err);
            else {
                doctor.specialization = specializationfromDB[0];
                DoctorModel.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, patient) => {
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })
            }
        })
    }

    deleteDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;

        DoctorModel.deleteOne({ 'username': doctor.username }, (err) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getAllExaminations = (req: express.Request, res: express.Response) => {
        ExaminationModel.find({}, (err, examinations) => {
            if (err) console.log(err);
            else res.json(examinations);
        })
    }

    approveExamination = (req: express.Request, res: express.Response) => {
        let examination = req.body.examination;

        ExaminationModel.findOneAndUpdate({ '_id': examination._id }, {status: 'approved' }, (err, examination) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    declineExamination = (req: express.Request, res: express.Response) => {
        let examination = req.body.examination;

        ExaminationModel.findOneAndUpdate({ '_id': examination._id }, {status: 'declined'}, (err, examination) => {
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getAllSpecializations = (req: express.Request, res: express.Response) => {
        SpecializationModel.find({}, (err, specializations) => {
            if (err) console.log(err);
            else res.json(specializations);
        })
    }

    addSpecialization = (req: express.Request, res: express.Response) => {
        let name = req.body.name;

        let specialization = new SpecializationModel(req.body);
        specialization.save().then((specialization) => {
            res.status(200).json({'message': 'ok'});
        }).catch((err) => {
            res.status(400).json({'message': "none"});
        })
    }

    addExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let price = req.body.price;
        let duration = req.body.duration;
        let specializationName = req.body.specializationName;

        SpecializationModel.findOne({ 'name': specializationName }, (err, specialization) => {
            if (err) console.log(err);
            else {
                let examination = new ExaminationModel({name: name, price: price, duration: duration, specialization: specialization, status: "accepted"});
                examination.save().then((examination) => {
                    res.status(200).json({'message': 'ok'});
                }).catch((err) => {
                    res.status(400).json({'message': "none"});
                })
            }
        })
    }

    deleteExamination = (req: express.Request, res: express.Response) => {
        let newExamination = req.body.examination;

        ExaminationModel.updateOne({ '_id': newExamination._id }, {status: 'deleted'}, (err, examinationFromDB) => {
            if (err) console.log(err);
            else {
                //Need to update all doctor's examinations with this examination

                console.log(newExamination._id);
                
                DoctorModel.find({}, (err, doctors) => {
                    if (err) console.log(err);
                    else {
                        let updateRequired = false;
                        doctors.forEach(doctor => {
                            updateRequired = false;
                            let examinations = doctor.examinations;
                            examinations.forEach(examination => {
                                if(examination._id == newExamination._id){
                                    examination.status = "deleted";
                                    updateRequired = true;
                                }
                            });
                            if(updateRequired) {
                                DoctorModel.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, doctor) => {
                                    if (err) console.log(err);
                                    else console.log("ok for doctor " + doctor.username);
                                })
                            }
                        });
                        res.json({"message": "ok"});
                    }
                });
            }
        });
    }

    editExamination = (req: express.Request, res: express.Response) => {
        let newExamination = req.body.examination;

        ExaminationModel.updateOne({ '_id': newExamination._id }, 
        {
            name: newExamination.name,
            price: newExamination.price,
            duration: newExamination.duration,
            specialization: newExamination.specialization
        }, (err, response) => {
            if (err) console.log(err);
            else {
                
                //Need to update all doctor's examinations with this examination
                DoctorModel.find({}, (err, doctors) => {
                    if (err) console.log(err);
                    else {
                        let updateRequired = false;
                        doctors.forEach(doctor => {
                            updateRequired = false;
                            let examinations = doctor.examinations;
                            examinations.forEach(examination => {
                                if(examination._id == newExamination._id){
                                    examination.name = newExamination.name;
                                    examination.duration = newExamination.duration;
                                    examination.price = newExamination.price;
                                    examination.specialization = newExamination.specialization;
                                    updateRequired = true;
                                }
                            });
                            if(updateRequired) {
                                DoctorModel.findOneAndUpdate({ 'username': doctor.username }, doctor, (err, doctor) => {
                                    if (err) console.log(err);
                                    else console.log("ok for doctor " + doctor.username);
                                })
                            }
                        });
                        res.json({"message": "ok"});
                    }
                });
            }
        });
        
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let newPassword = req.body.newPassword;

        console.log(id);
        console.log(newPassword);
        ManagerModel.findOneAndUpdate({ '_id': id }, {password: newPassword}, (err, response) => {
            if (err) console.log(err);
            else {
                ManagerModel.findOne({ '_id': id }, (err, manager) => {
                    if (err) console.log(err);
                    else res.json({"message": "ok", "manager": manager});
                });
            }
        });
    }
}

