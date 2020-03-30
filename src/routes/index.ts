import { Application } from "express";
import routesUser from './routes-user';
import routesAuth from './routes-auth';

class Routes {       

    public setRoutes(app: Application): void {   
        routesUser.setRoutes(app, '/api/users');
        routesAuth.setRoutes(app, '/api/login');
    }
}

export default new Routes();