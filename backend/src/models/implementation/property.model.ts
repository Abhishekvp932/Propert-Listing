import mongoose from "mongoose";
import { IProperty } from "../interface/IProperty";

const { Schema, model } = mongoose;

const propertySchema = new Schema<IProperty>(
  {
    location: {
      type: String,
      required: true,
      time: true,
    },
    title: {
      type: String,
      required: true,
      time: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: [String],
      validate: [
        (val: string[]) => val.length > 0,
        "At least one image required",
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDelete:{
      type:Boolean,
      defautl:false,
    },
  },
  { timestamps: true },
);

propertySchema.index({ location: 1 });
propertySchema.index({ price: 1 });

const Property = model("Property", propertySchema);

export default Property;
