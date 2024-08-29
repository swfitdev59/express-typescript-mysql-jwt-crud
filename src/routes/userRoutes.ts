import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
import { UserController } from "../controllers/UserController";
import { sendSuccessMessage, sendErrorMessage } from "../config/utils";
import jwt from "../middleware/jwt";

const controller = new UserController();

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const data = await controller.signin(req);
    sendSuccessMessage(res, data, "success");
  } catch (error: unknown) {
    sendErrorMessage(res, error);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const data = await controller.create(req);
    sendSuccessMessage(res, data, "success");
  } catch (error: unknown) {
    sendErrorMessage(res, error);
  }
});

router.get("/", jwt, async (req: Request, res: Response) => {
  try {
    const data = await controller.get();
    sendSuccessMessage(res, data, "success");
  } catch (error: unknown) {
    sendErrorMessage(res, error);
  }
});

router.put("/:id", jwt, async (req: Request, res: Response) => {
  try {
    const data = await controller.update(req);
    sendSuccessMessage(res, data, "success");
  } catch (error: unknown) {
    sendErrorMessage(res, error);
  }
});

router.delete("/:id", jwt, async (req: Request, res: Response) => {
  try {
    const data = await controller.delete(req);
    sendSuccessMessage(res, data, "success");
  } catch (error: unknown) {
    sendErrorMessage(res, error);
  }
});

module.exports = router;
