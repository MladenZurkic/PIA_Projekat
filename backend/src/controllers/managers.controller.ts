import express from 'express';
import ManagerModel from '../models/manager'

export class ManagersController {

    login = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let password = req.body.password;

        ManagerModel.findOne({ 'username': username, 'password': password }, (err, manager) => {
            if (err) console.log(err);
            else res.json({user: manager, type: "manager"});
        })
    }
}