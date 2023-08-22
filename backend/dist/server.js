"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const doctors_routes_1 = __importDefault(require("./routers/doctors.routes"));
const patients_routes_1 = __importDefault(require("./routers/patients.routes"));
const managers_routes_1 = __importDefault(require("./routers/managers.routes"));
const appointments_routes_1 = __importDefault(require("./routers/appointments.routes"));
const reports_routes_1 = __importDefault(require("./routers/reports.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/piaprojekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/doctors', doctors_routes_1.default);
router.use('/patients', patients_routes_1.default);
router.use('/managers', managers_routes_1.default);
router.use('/appointments', appointments_routes_1.default);
router.use('/reports', reports_routes_1.default);
app.use('/uploads', express_1.default.static('uploads'));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map