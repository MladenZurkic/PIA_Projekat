"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managers_controller_1 = require("../controllers/managers.controller");
const managersRouter = express_1.default.Router();
managersRouter.route('/login').post((req, res) => new managers_controller_1.ManagersController().login(req, res));
exports.default = managersRouter;
//# sourceMappingURL=managers.routes.js.map