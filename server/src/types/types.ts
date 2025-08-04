import mongoose from "mongoose";

export interface Users {
  username: string;
  email: string;
  password: string;
  bio:string;
}

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}




