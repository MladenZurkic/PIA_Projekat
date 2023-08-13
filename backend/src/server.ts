import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import doctorsRouter from './routers/doctors.routes';
import patientsRouter from './routers/patients.routes';
import managersRouter from './routers/managers.routes';
import appointmentsRouter from './routers/appointments.routes';
import reportsRouter from './routers/reports.routes';


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/piaprojekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/doctors', doctorsRouter)
router.use('/patients', patientsRouter)
router.use('/managers', managersRouter)
router.use('/appointments', appointmentsRouter)
router.use('/reports', reportsRouter)

app.use('/uploads',express.static('uploads'));

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));