import { QueryFilter } from "mongoose";

export interface IBaseRepository<T> {
    create?(data:Partial<T>):Promise<T>;
    findById?(id:string):Promise<T | null>;
    findAll?(filter:QueryFilter<T>,skip:number,limit:number):Promise<T[]>;
    delete?(id:string):Promise<T|null>;
    findByIdAndUpdate?(id:string,data:Partial<T>):Promise<T | null>;
    // count
}