import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import responseTime from "response-time";
import Passport from "./passport";
/** Router */
import MainRouter from "./routes";

/** Setup application */
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("../public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(responseTime());
app.use(Passport.initialize());
app.use(Passport.session());
app.use(MainRouter);

const Application = app;
export default Application;
