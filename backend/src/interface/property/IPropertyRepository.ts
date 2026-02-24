import { IProperty } from "../../models/interface/IProperty";
import { PropertyEntity } from "../../types/propertyCreateType";

export interface IPropertyRepository {
    create(data:Partial<PropertyEntity>):Promise<IProperty | null>;
    findOwnerId(userId:string):Promise<IProperty[]>;
    findAll():Promise<IProperty[]>;
    findById(property:string):Promise<IProperty | null>;
    delete(property:string):Promise<IProperty | null>;
}