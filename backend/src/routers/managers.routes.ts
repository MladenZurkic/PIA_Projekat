import express from 'express';
import { ManagersController } from '../controllers/managers.controller';


const managersRouter = express.Router();

managersRouter.route('/login').post(
    (req, res) => new ManagersController().login(req, res)
);

export default managersRouter;