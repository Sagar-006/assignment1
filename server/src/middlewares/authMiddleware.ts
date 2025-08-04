// import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication token required!!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // console.log("this is",decoded)
    // @ts-ignore
    req.user = decoded;
    // @ts-ignore
    // console.log("this is user data",req.user);
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid or expired token!" });
  }
};
