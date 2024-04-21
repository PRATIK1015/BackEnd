import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import routes from "./app/routes";

// Database configuration
// import "./app/config/db";
import config from "./config";

const app = express();
app.use(cookieParser());

//  TO ACCESS COOKIE FROM THE FRONTEND  ADD "withCredentials: true" WITH EACH REQUEST
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Import routes
app.use(routes);

const PORT = config.port || 8080;

// Server configuration
app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});