import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* Route Imports */
import dashboardRoutes from "./routes/dashboardRoutes";

/* configuration */
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/dashboard" , dashboardRoutes ); // http://localhost:8000/dashboard



/* Server */
const port = process.env.Port || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});