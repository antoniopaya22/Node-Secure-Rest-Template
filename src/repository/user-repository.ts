import { User } from '../models/user';
import { DeleteResult, UpdateResult } from 'typeorm';
import app from '../app';

export class UserRepository {

    public static getUsers(): Promise<User[]> {
        return app.get('db').getRepository(User).find();
    }

    public static getUserById(id: number): Promise<User> {
        return app.get('db').getRepository(User).findOne({
            where: {
                id: id
            }
        });
    }

    public static getUserByUsername(username: number): Promise<User> {
        return app.get('db').getRepository(User).findOne({
            where: {
                username: username
            }
        });
    }

    public static deleteUser(id: number): Promise<DeleteResult> {
        return app.get('db').getRepository(User).delete({id: id});
    }

    public static addUser(user: User): Promise<User> {
        return app.get('db').getRepository(User).save(user);
    }

    public static updateUser(id: number, user: User): Promise<UpdateResult> {
        return app.get('db').getRepository(User).update(id, user);
    }
}