import { Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { IUserModel } from "../03-models/user.model";

const secretKey = "Very_Unsuspected_SECRET_KEY";

function getNewToken(user: IUserModel): string {
    const payload = { user };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {

            if (!request.headers.authorization) {
                resolve(false);
                return;
            }

            const token = request.headers.authorization.substring(7);

            if (!token) {
                resolve(false);
                return;
            }

            jwt.verify(token, secretKey, (err: VerifyErrors, payload: JwtPayload) => {

                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });

        }

        catch (err: any) {
            reject(err);
        }
    });
}

function getUserFromToken(request: Request): IUserModel {

    const token = request.headers.authorization.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user;
    return user;
}

export default {
    getNewToken,
    verifyToken,
    getUserFromToken
};
