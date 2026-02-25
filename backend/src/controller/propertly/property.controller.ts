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
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 1;
      const result = await this._propertyService.getUserProperty(
        userId as string,
        page,
        limit,
      );
      res.status(HttpStatus.OK).json({ properties: result.property,total:result.total,totalPage:Math.ceil(result.total / limit)});
      return;
    } catch (error) {
      const err = error as Error;

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }
  async getAllProperties(req: Request, res: Response): Promise<void> {
    try {
       const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const search = (req.query.search as string) || "";
    const minPrice = Number(req.query.minPrice) || 0;
     const maxPrice =
      Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
      const result = await this._propertyService.getAllProperties(page,limit,search,minPrice,maxPrice);

      res.status(HttpStatus.OK).json({data:result.property,total:result.total,totalPage:Math.ceil(result.total/limit)});
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

  async updateProperty(req: Request, res: Response): Promise<void> {
    try {
       const { title, description, price, location, owner } = req.body;
       const {propertyId} = req.params 
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
      console.log('dto updating property',dto);
      const result = await this._propertyService.updateProperty(propertyId as string,dto);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const err = error as Error;
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg : err.message});
    }
  }
}
