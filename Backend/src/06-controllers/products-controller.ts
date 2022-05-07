import express, { NextFunction, Request, Response } from "express";
import { CartProductModel } from "../03-models/cart-product.model";
import { ProductModel } from "../03-models/product.model";
import productsLogic from "../05-bll/products-logic";

const router = express.Router();

//Get all products
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

//Get products by category
router.get("/categories/:categoryId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getProductsByCategory(request.params.categoryId);
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

//Get one product
router.get("/product/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const product = await productsLogic.getOneProduct(id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

//Get all cart products
router.get("/cart-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartProducts = await productsLogic.getAllCartProducts();
        response.json(cartProducts);
    }
    catch (err: any) {
        next(err);
    }
});

//Get all categories
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});

//Add product
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let product = new ProductModel(request.body); 
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

//Add product to cart
router.post("/cart-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = request.body;         
        const cartProduct = new CartProductModel();
        cartProduct.productId = product.productId;
        cartProduct.quantity = 1;
        cartProduct.price = product.price;
        cartProduct.totalPrice = product.price;

        const addedProduct = await productsLogic.addToCart(cartProduct);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

//Edit product
router.patch("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const product = new ProductModel(request.body);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

//Increase product quantity in cart
router.patch("/cart-products/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const cartProduct = new CartProductModel(request.body);
        cartProduct.productId = id;
        const product = await productsLogic.increaseCardProductQuantity(cartProduct);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

//Decrease product quantity in cart
router.patch("/cart-products/quantity/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const cartProduct = new CartProductModel(request.body);
        cartProduct.productId = id;
        const product = await productsLogic.decreaseCardProductQuantity(cartProduct);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

//Remove product from cart
router.delete("/cart-products/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const cartProduct = await productsLogic.removeFromCart(id);
        response.json(cartProduct);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
