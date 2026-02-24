import { Request, Response } from "express";
import { IPropertyController } from "../../interface/property/IPropertyController";
import { IPropertyService } from "../../interface/property/IPropertyService";
import { HttpStatus } from "../../utility/httpStatusCode";
import { CreatePropertyDTO } from "../../types/create-property.dto";

export class PropertyController implements IPropertyController {
  constructor(private _propertyService: IPropertyService) {}

  async createNewPropery(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, price, location, owner } = req.body;
      const files = req.files as Express.Multer.File[];
      const imageUrls = files.map((file) => file.path);

      const dto: CreatePropertyDTO = {
        title,
        description,
        price: Number(price),
        location,
        owner,
        images: imageUrls,
      };

      const result = await this._propertyService.createNewProperty(dto);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const err = error as Error;
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }

  async getUserProperties(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this._propertyService.getUserProperty(
        userId as string,
      );
      res.status(HttpStatus.OK).json({ properties: result });
      return;
    } catch (error) {
      const err = error as Error;

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }
  async getAllProperties(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._propertyService.getAllProperties();

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const err = error as Error;
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }

  async getSingleProperty(req: Request, res: Response): Promise<void> {
    try {
      const { propertyId } = req.params;
      const result = await this._propertyService.getSingleProperties(
        propertyId as string,
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const err = error as Error;
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }

  async deleteProperty(req: Request, res: Response): Promise<void> {
      try {
        const {propertyId} = req.params;
        const result = await this._propertyService.deleteProperty(propertyId as string);
        res.status(HttpStatus.OK).json(result);
      } catch (error) {
        const err = error as Error
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg : err.message});
      }
  }
}
