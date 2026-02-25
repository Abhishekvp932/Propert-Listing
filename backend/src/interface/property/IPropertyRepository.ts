import { FilterQuery } from "mongoose";
import { IProperty } from "../../models/interface/IProperty";
import { PropertyEntity } from "../../types/propertyCreateType";

export interface IPropertyRepository {
    create(data:Partial<PropertyEntity>):Promise<IProperty | null>;
    findOwnerId(userId:string,skip:number,limit:number):Promise<IProperty[]>;
    findAll(filter:FilterQuery<IProperty>,skip:number,limit:number):Promise<IProperty[]>;
    findById(property:string):Promise<IProperty | null>;
    delete(property:string):Promise<IProperty | null>;
    findByIdAndUpdate(propertyId:string,data:Partial<PropertyEntity>):Promise<IProperty |null>;
    count(filter?:FilterQuery<IProperty>):Promise<number>;
}