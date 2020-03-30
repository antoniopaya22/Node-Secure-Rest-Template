import { Auth } from "../middlewares/auth";
import { Application } from "express";

class RoutesAuth {
    public auth: Auth = new Auth();

    public setRoutes(app: Application, urlBase: string): void {
        // ======== LOGIN ============
        app.route(urlBase)
            .post(this.auth.login)
    }
}

export default new RoutesAuth();