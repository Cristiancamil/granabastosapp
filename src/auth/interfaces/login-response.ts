import { UserResponse } from "./user.interface";
import { User } from "../entities/user.entity";

export interface LoginResponse {
    user: User;
    token: string;
}