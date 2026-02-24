import { Types } from "mongoose";

export interface PropertyEntity {
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string[];
  owner: Types.ObjectId;
}