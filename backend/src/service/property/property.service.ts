import { IPropertyService } from "../../interface/property/IPropertyService";
import { IPropertyRepository } from "../../interface/property/IPropertyRepository";
import { IUserRepository } from "../../interface/user/IUserRepository";
import { PropertyTypes } from "../../types/propertyType";
import { CreatePropertyDTO } from "../../types/create-property.dto";
import { IProperty } from "../../models/interface/IProperty";
import { Types } from "mongoose";
import { PropertyEntity } from "../../types/propertyCreateType";
import { ErrorMessage } from "../../utility/errorMessage";
import mongoose from "mongoose";
export class PropertyService implements IPropertyService {
  constructor(
    private _propertyRepository: IPropertyRepository,
    private _userRepository: IUserRepository,
  ) {}
  async createNewProperty(data: CreatePropertyDTO): Promise<{ msg: string }> {
    const user = await this._userRepository.findById(data.owner);

    if (!user) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }

    const newProperty: PropertyEntity = {
      title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      owner: new Types.ObjectId(data.owner),
      imageUrl: data.images,
    };
    await this._propertyRepository.create(newProperty);
    return { msg: "Property added Successfully" };
  }
  async getUserProperty(userId: string,page:number,limit:number): Promise<{property:IProperty[],total:number}> {
    const skip = (page - 1) * limit
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }
    const total = await this._propertyRepository.count();

    const properties = await this._propertyRepository.findOwnerId(userId,skip,limit);

    return {property:properties,total:total};
  }

  async getAllProperties(page:number,limit:number,search:string,minPrice:number,maxPrice:number): Promise<{property:IProperty[],total:number}> {
    const skip = (page - 1) * limit;

    const filter : mongoose.QueryFilter<IProperty> = {
      price : {$gte:minPrice,$lte:maxPrice}
    }

    if(search){
      filter.location = { $regex: search, $options: "i"}
    }
    const total  = await this._propertyRepository.count(filter);
    const properties = await this._propertyRepository.findAll(filter,skip,limit);

    return {property:properties,total:total};
  }

  async getSingleProperties(propertyId: string): Promise<IProperty | null> {
    const property = await this._propertyRepository.findById(propertyId);

    if (!property) {
      throw new Error(ErrorMessage.PROPERTY_NOT_FOUND);
    }

    return property;
  }

  async deleteProperty(propertyId: string): Promise<{ msg: string }> {
    if (!propertyId) {
      throw new Error(ErrorMessage.PROPERTY_ID_MISSING);
    }

    const property = await this._propertyRepository.findById(propertyId);

    if (!property) {
      throw new Error(ErrorMessage.PROPERTY_NOT_FOUND);
    }

    await this._propertyRepository.delete(propertyId);

    return { msg: "Property Deleted successfully" };
  }

  async updateProperty(propertyId: string, data: CreatePropertyDTO): Promise<{ msg: string; }> {
    if(!propertyId){
      throw new Error(ErrorMessage.PROPERTY_ID_MISSING)
    }
    const updateProperty : PropertyEntity = {
       title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      owner: new Types.ObjectId(data.owner),
      imageUrl: data.images,
    }

    const updatedProperty = await this._propertyRepository.findByIdAndUpdate(propertyId,updateProperty);
    if(!updatedProperty){
      throw new Error(ErrorMessage.PROPERTY_NOT_FOUND);
    }
    return {msg : 'Property Updated successfully'};
  }
}
