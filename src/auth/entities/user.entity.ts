import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    email: string;

    @Column({})
    name: string;

    @Column({})
    password?: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GHOST
    })
    roles: UserRole;
}
