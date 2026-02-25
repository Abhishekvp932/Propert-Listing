import { FilterQuery } from "mongoose";
import { IPropertyRepository } from "../../interface/property/IPropertyRepository";
import Property from "../../models/implementation/property.model";
import { IProperty } from "../../models/interface/IProperty";
import { BaseRepository } from "../base.repository";


export class PropertyRepository extends BaseRepository<IProperty> implements IPropertyRepository{
    constructor(){
        super(Property);
    }
    async findOwnerId(userId: string,skip:number,limit:number): Promise<IProperty[]> {
        return await Property.find({owner:userId})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
    }
    async count(filter?: FilterQuery<IProperty>): Promise<number> {
        return await Property.countDocuments(filter);
    }
}