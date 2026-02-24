import { Document, Model } from "mongoose";
import { IBaseRepository } from "../interface/IBaseRepository";


export class BaseRepository <T extends Document> implements IBaseRepository<T> {
    constructor(private _model:Model<T>){};

   async create(data: Partial<T>): Promise<T> {
        return await this._model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id)
    }

    async findAll(): Promise<T[]> {
        return await this._model.find();
    }

    async delete(id: string): Promise<T | null> {
        return await this._model.findByIdAndDelete(id);
    }
}