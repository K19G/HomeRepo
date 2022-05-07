import { Document, Schema, model } from 'mongoose';
import { CategoryModel } from './category.model';

export interface IProductModel extends Document {
    productName: string;
    price: number;
    imageName: string;
    categoryId: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProductModel>({
    productName: {
        type: String,
        required: [true, "Missing Name"]
    },
    price: {
        type: Number,
        required: [true, "Missing Price"]
    },
    imageName: {
        type: String,
        required: [true, "Missing Image"]
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing Category"],
        ref: "CategoryModel"
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ProductSchema.virtual('category', {
    ref: CategoryModel,
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true
});

export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "Products");
