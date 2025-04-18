import { Router } from "express";
import { ShortenerController } from "../controllers";

export const URLRouter: Router = Router();
const shortenerController = new ShortenerController

const {
    createShortUrl,
    redirectToLongUrl,
    getURLClicks
} = shortenerController

URLRouter.post("/shorten", createShortUrl);
URLRouter.get("/:shortCode", redirectToLongUrl);
URLRouter.get("/clicks/:shortCode", getURLClicks)