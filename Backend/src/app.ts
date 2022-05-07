import dotenv from "dotenv";
import dal from "./04-dal/dal";
dotenv.config();
dal.connectToMongoDB();
import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import productsController from "./06-controllers/products-controller";
import usersController from "./06-controllers/users-controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);
server.use("/api/auth", usersController);
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));    
      