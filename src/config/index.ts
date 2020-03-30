import database from "./database";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { Connection } from 'typeorm';
import { Application } from "express";

export class Config {

    public app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public async setConfig(): Promise<Application>{
        this.setBodyParser();
        this.setCors();
        this.setDotEnv();
        this.setHttpHeaders();
        this.setLimiter();
        await this.setDB();
        return this.app;
    }

    private async setDB(){
        const databaseName = process.env.MODE || 'dev';
        if ( await database.setDB(databaseName) )
            console.log("The connection to the database has been established in mode: " + databaseName);
        this.app.set('db', this.getDB());
    }

    private getDB(): Connection{
        return database.getDB();
    }

    private setBodyParser() {
        // support application/json type post data
        this.app.use(bodyParser.json({ limit: '50mb' }));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        return this.app;
    }

    private setCors() {
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        this.app.use(cors(options));
    }

    private setDotEnv(){
        dotenv.config();
    }

    private setHttpHeaders() {
        this.app.use(helmet());
    }

    private setLimiter() {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 20 // 20 requests
        });
        this.app.use('/api/login', limiter);
    }

}