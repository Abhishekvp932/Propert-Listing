import { PayloadUser } from "../../types/payloadUser";

export interface IAuthService {
    login(email:string,password:string):Promise<{accessToken:string,refreshToken:string,user:PayloadUser}>;
    signup(name:string,email:string,phone:string,password:string):Promise<{msg:string}>;
}