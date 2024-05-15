import { UserRole } from "../entities/user.entity";

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    isActive: boolean;
    roles: UserRole;
}