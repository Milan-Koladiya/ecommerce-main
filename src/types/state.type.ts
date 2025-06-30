import type { IUser } from "./auth.type";

export interface IntialStateType{
    loading:string,
    message:string,
    error:boolean,
    apiName:string,
    alertType:''|'info'|'success'|'danger'|'warning',
    emailStatus?:string,
    profile?:IUser,
    
}