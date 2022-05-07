import { Schema } from 'mongoose';
import ClientError from '../03-models/client-error';
import { CategoryModel, ICategoryModel } from '../03-models/category.model';
import { CartProductModel, ICartProductModel } from '../03-models/cart-product.model';
import { ProductModel, IProductModel } from '../03-models/product.model';
import { UserModel, IUserModel } from '../03-models/user.model';


async function getAllProducts(): Promise<IProductModel[]> {
    return await ProductModel.find().populate("category").exec();
};

async function getProductsByCategory(categoryId: Schema.Types.ObjectId | string): Promise<IProductModel[]> {
    return await ProductModel.find({"categoryId": categoryId}).populate("category").exec();
}

async function getOneProduct(productId: Schema.Types.ObjectId | string): Promise<IProductModel> {
    return await ProductModel.findOne({"_id": productId }).exec();
};

async function getAllCartProducts(): Promise<ICartProductModel[]> {
    return await CartProductModel.find().populate("product").exec();
    // return await CartProductModel.find().exec();
};

async function getOneCartProduct(cartProductId: Schema.Types.ObjectId | string): Promise<ICartProductModel> {
    return await CartProductModel.findOne({ "productId": cartProductId }).exec();
}

async function getAllCategories(): Promise<ICategoryModel[]> {
    return await CategoryModel.find().exec();
};

async function addProduct(product: IProductModel): Promise<IProductModel> {
    return await ProductModel.create(product);
};

async function addToCart(product: ICartProductModel): Promise<ICartProductModel> {
    // const errors = product.validateSync();
    // if (errors) 
    //     throw new ClientError(400, errors.message);

    const cartProducts = await getAllCartProducts();
    let doesExist: boolean = false;
    cartProducts.forEach(cp => {
        if (cp.productId === product.productId)
            doesExist = true;
    });

    if (doesExist === false) {
        return await product.save();
    }
    else
        throw new ClientError(400, "Product already exists in cart");
}

async function editProduct(product: IProductModel): Promise<IProductModel> {
    const dbProduct = await getOneProduct(product._id);
    for (const prop in product) {
        if (product[prop] !== undefined) {
            dbProduct[prop] = product[prop];
        }
    }
    product = await dbProduct.save();
    return product;
};

async function increaseCardProductQuantity(product: ICartProductModel): Promise<ICartProductModel> {
    const cartProduct = await getOneCartProduct(product.productId);
    cartProduct.quantity += 1;
    cartProduct.totalPrice = cartProduct.quantity * cartProduct.price;
    return await cartProduct.save();
}

async function decreaseCardProductQuantity(product: ICartProductModel): Promise<ICartProductModel> {
    const cartProduct = await getOneCartProduct(product.productId);
    if (cartProduct.quantity <= 1) {
        throw new ClientError(400, "Cannot decrease quantity below 1");
    }
    cartProduct.quantity -= 1;
    cartProduct.totalPrice = cartProduct.quantity * cartProduct.price;
    return await cartProduct.save();
}

async function removeFromCart(productId: Schema.Types.ObjectId | string): Promise<void> {
    if (productId === undefined || productId === null)
        throw new ClientError(400, "ProductId is required");

    const cartProduct = await getOneCartProduct(productId);
    await cartProduct.remove();
}

async function getAllUsers(): Promise<IUserModel[]> {
    return await UserModel.find().exec();
}

export default {
    getAllProducts,
    getProductsByCategory,
    getOneProduct,
    getAllCartProducts,
    getAllCategories,
    addProduct,
    addToCart,
    editProduct,
    increaseCardProductQuantity,
    decreaseCardProductQuantity,
    removeFromCart,
    getAllUsers
};
