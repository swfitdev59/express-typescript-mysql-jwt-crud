import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import jwtToken from "jsonwebtoken";

const jwt = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken !== undefined && headerToken?.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7);
    try {
      await jwtToken.verify(bearerToken, env.SECRET);
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(403).json({ message: "Access Forbidden" });
  }
};

export default jwt;
