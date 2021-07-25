import express, {Application} from 'express';
import bodyParser from "body-parser";
import db from "./db/database"
import {authCheck} from "./middlewares/authMiddleware";
import {registerRoutes} from "./routes/routeManager";

const configuration = require('dotenv').config();
const app: Application = express();


function bootstrap() {
    if (configuration.error) {
        console.error(`Unable to load environment settings.\r\n${configuration.error}`);
        process.exit();
    }
    console.log("Loaded configuration!");
    console.log(`Running with KEY = ${process.env.SECRET_KEY || "capybara"}`);
    (async () => {
        let connected = await db.isConnected()
        if (connected) {
            let port = process.env.PORT || 5000;
            console.log(`Connection with database established!`);
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