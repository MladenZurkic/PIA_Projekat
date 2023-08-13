"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagersController = void 0;
const manager_1 = __importDefault(require("../models/manager"));
class ManagersController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            manager_1.default.findOne({ 'username': username, 'password': password }, (err, manager) => {
                if (err)
                    console.log(err);
                else
                    res.json({ user: manager, type: "manager" });
            });
        };
    }
}
exports.ManagersController = ManagersController;
//# sourceMappingURL=managers.controller.js.map