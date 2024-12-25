import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* Route Imports */


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
app.get("/hello" , (req, res) => {
    res.send("Hello World2"); 
});


/* Server */
const port = process.env.Port || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});