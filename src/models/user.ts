import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    constructor(username?: string, lastname?: string, hash?: string, salt?: string) {
        this.username = username;
        this.lastname = lastname;
        this.hash = hash;
        this.salt = salt;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    lastname: string;

    @Column()
    hash: string;

    @Column()
    salt: string;

}