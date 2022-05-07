import { Document, Schema, model } from 'mongoose';
import { ProductModel } from './product.model';

export interface ICartProductModel extends Document {
    productId: Schema.Types.ObjectId | string;
    quantity: number;
    price: number;
    totalPrice: number;
}

const CartProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing Product ID"]
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be at least 1"],
    },
    price: {
        type: Number,
        required: [true, "Missing Price"],
        min: [0.1, "Price must be greater than 0"],
    },
    totalPrice: {
        type: Number,
        min: [0.1, "totalPrice must be greater than 0"],
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CartProductSchema.virtual('product', {
    ref: ProductModel,
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

export const CartProductModel = model<ICartProductModel>("CartProductModel", CartProductSchema, "CartProducts");