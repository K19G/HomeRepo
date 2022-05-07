import { Document, Schema, model } from 'mongoose';

export interface ICategoryModel extends Document {
    categoryName: string;
}

const CategorySchema = new Schema<ICategoryModel>({
    categoryName: {
        type: String,
        required: [true, "Missing Category Name"]
    }
});

export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "Categories");