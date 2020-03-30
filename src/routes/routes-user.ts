import { UserController } from "../controllers/user-controller";
import { Auth } from "../middlewares/auth";
import { Application } from "express";

class RoutesUser {

    public userController: UserController = new UserController();
    public auth: Auth = new Auth();

    public setRoutes(app: Application, urlBase: string): void {

        // ========= USERS =========       
        app.route(urlBase)
            .get(this.userController.getUsers)
            .post(this.userController.addUser)

            // Auth need routes
        app.route(urlBase + '/:id')
            .get(this.auth.isAuth, this.userController.getUserById)
            .delete(this.auth.isAuth, this.userController.deleteUser)
            .put(this.auth.isAuth, this.userController.updateUser)
    }
}

export default new RoutesUser();