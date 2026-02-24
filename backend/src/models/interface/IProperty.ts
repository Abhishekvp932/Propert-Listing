import { Document, Types } from "mongoose";

export interface IProperty extends Document {
  location: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string[];
  owner: Types.ObjectId;
  isDelete?:Boolean;
  createdAt: Date;
  updatedAt: Date;
}