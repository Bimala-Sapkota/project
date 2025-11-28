import type { Role } from "./enums";


export interface IUser {
    _id:string;
    first_name:string;
    last_name:string;
    email:string;
    phone:string;
    role:Role
    createdAt:string;
    updatedAt:string;
}