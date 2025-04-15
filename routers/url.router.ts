import { Router } from "express";
import { ShortnerController } from "../controllers";

export const URLRouter: Router = Router();
const shortnerController = new ShortnerController

const {
    createShortUrl,
    redirectToLongUrl
} = shortnerController

URLRouter.post("/shorten", createShortUrl);
URLRouter.get("/:shortCode", redirectToLongUrl);