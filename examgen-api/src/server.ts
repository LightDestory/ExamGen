import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import db from "./db/database"
import {authCheck} from "./middlewares/authMiddleware";
import {registerRoutes} from "./routes/routeManager";
import {DEFAULT_SECRET_KEY, DEFAULT_PORT} from "./config/globals";

const configuration = require('dotenv').config();
const app: Application = express();


function bootstrap() {
    if (configuration.error) {
        console.warn(`Unable to load .env file.\r\n${configuration.error}\r\nUsing OS's/Docker or default values...`);
    }
    console.log("Loaded configuration!");
    console.log(`Running with KEY = ${process.env.SECRET_KEY || DEFAULT_SECRET_KEY}`);
    (async () => {
        let connected = await db.isConnected()
        if (connected) {
            let port = process.env.PORT || DEFAULT_PORT;
            console.log(`Connection with database established!`);
            app.use(cors({origin: '*'}));
            app.use(express.json(), express.text(), bodyParser.urlencoded({extended: false}));
            app.use(authCheck);
            registerRoutes(app);
            app.listen(port, () => {
                console.log(`Listening to ${port}!`);
            });
        } else {
            console.error(`Unable to connect to the database!`);
            process.exit();
        }
    })()
}

bootstrap();