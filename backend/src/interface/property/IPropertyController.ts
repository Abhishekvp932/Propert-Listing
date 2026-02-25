import { Request, Response } from "express";

export interface IPropertyController {
    createNewPropery(req:Request,res:Response):Promise<void>;
    getUserProperties(req:Request,res:Response):Promise<void>;
    getAllProperties(req:Request,res:Response):Promise<void>;
    getSingleProperty(req:Request,res:Response):Promise<void>;
    deleteProperty(req:Request,res:Response):Promise<void>;
    updateProperty(req:Request,res:Response):Promise<void>;
}