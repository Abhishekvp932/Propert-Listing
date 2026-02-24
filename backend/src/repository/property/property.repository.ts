import { IPropertyRepository } from "../../interface/property/IPropertyRepository";
import Property from "../../models/implementation/property.model";
import { IProperty } from "../../models/interface/IProperty";
import { BaseRepository } from "../base.repository";


export class PropertyRepository extends BaseRepository<IProperty> implements IPropertyRepository{
    constructor(){
        super(Property);
    }
    async findOwnerId(userId: string): Promise<IProperty[]> {
        return await Property.find({owner:userId});
    }
}