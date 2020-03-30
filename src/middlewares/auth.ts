import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserRepository } from '../repository/user-repository';

const secret: string = "secretAPI-RESTnodejs1234$";
const signOpts = {
    expiresIn: "24h"
};

export class Auth {

    public async login(req: Request, res: Response) {
        try {
            const user = await UserRepository.getUserByUsername(req.body.username);
            if(user){
                const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);
                hash == user.hash ? 
                    res.status(200).send(Auth.createToken(user.username)) :
                    res.status(403).json({error: "Error, la contraseña no coincide"});
            } else res.status(404).json({error: "El usuario no existe"});
        } catch (error) {
            res.status(500).json({ error: "Error al intentar iniciar sesion" });
        }
    }

    public isAuth(req: Request, res: Response, next) {
        try {
            jwt.verify(req.headers.authorization, secret, function(err, decoded) {
                if(err){
                    res.status(403).send("Invalid authorization: "+err);
                }else{
                    next();
                }
            });
        } catch (err) {
            res.status(403).send("Invalid authorization: "+err);
        }
    }

    public static createToken(username: string): string{
        const payload = {
            name: username
        }
        return jwt.sign(payload, secret, signOpts);
    }

}