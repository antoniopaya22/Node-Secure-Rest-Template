import * as express from "express";
import routes from "./routes";
import { Config } from './config';


class App {

    public app: express.Application;
    public config: Config;

    constructor() {
        this.app = express();
        this.config = new Config(this.app);
        this.config.setConfig().then(application => {
            this.app = application;
            routes.setRoutes(this.app);
        });
    }

}

export default new App().app;
