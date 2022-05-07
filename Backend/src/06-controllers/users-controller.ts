import express, { NextFunction, Request, Response } from "express";
import usersLogic from "../05-bll/users-logic";

const router = express.Router();

router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await usersLogic.getAllUsers();
        response.json(users);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
