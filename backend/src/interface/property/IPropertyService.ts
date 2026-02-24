import { IProperty } from "../../models/interface/IProperty";
import { CreatePropertyDTO } from "../../types/create-property.dto";
import { PropertyTypes } from "../../types/propertyType";

export interface IPropertyService {
    createNewProperty(data:CreatePropertyDTO):Promise<{msg : string}>;
    getUserProperty(userId:string):Promise<IProperty[]>;
    getAllProperties():Promise<IProperty[]>;
    getSingleProperties(propertyId:string):Promise<IProperty | null>;
    deleteProperty(propertyId:string):Promise<{msg : string}>;
}