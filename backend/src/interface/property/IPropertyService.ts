import { IProperty } from "../../models/interface/IProperty";
import { CreatePropertyDTO } from "../../types/create-property.dto";
import { PropertyTypes } from "../../types/propertyType";

export interface IPropertyService {
    createNewProperty(data:CreatePropertyDTO):Promise<{msg : string}>;
    getUserProperty(userId:string,page:number,limit:number):Promise<{property:IProperty[],total:number}>;
    getAllProperties(page:number,limit:number,search:string,minPrice:number,maxPrice:number):Promise<{property:IProperty[],total:number}>;
    getSingleProperties(propertyId:string):Promise<IProperty | null>;
    deleteProperty(propertyId:string):Promise<{msg : string}>;
    updateProperty(propertyId:string,data:CreatePropertyDTO):Promise<{msg : string}>;
}