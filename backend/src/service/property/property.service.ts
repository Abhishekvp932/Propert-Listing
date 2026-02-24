import { IPropertyService } from "../../interface/property/IPropertyService";
import { IPropertyRepository } from "../../interface/property/IPropertyRepository";
import { IUserRepository } from "../../interface/user/IUserRepository";
import { PropertyTypes } from "../../types/propertyType";
import { CreatePropertyDTO } from "../../types/create-property.dto";
import { IProperty } from "../../models/interface/IProperty";
import { Types } from "mongoose";
import { PropertyEntity } from "../../types/propertyCreateType";
import { ErrorMessage } from "../../utility/errorMessage";

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
  async getUserProperty(userId: string): Promise<IProperty[]> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }
    const properties = await this._propertyRepository.findOwnerId(userId);

    return properties;
  }

  async getAllProperties(): Promise<IProperty[]> {
    const properties = await this._propertyRepository.findAll();

    return properties;
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
      throw new Error("Property id is missing");
    }

    const property = await this._propertyRepository.findById(propertyId);

    if (!property) {
      throw new Error(ErrorMessage.PROPERTY_NOT_FOUND);
    }

    await this._propertyRepository.delete(propertyId);

    return { msg: "Property Deleted successfully" };
  }
}
