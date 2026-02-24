import { Request, Response } from "express";
import { IUserController } from "../../interface/user/IUserController";
import { IUserService } from "../../interface/user/IUserService";
export class UserController implements IUserController {
    constructor(
        private _userSerivce:IUserService
    ){}
    
}