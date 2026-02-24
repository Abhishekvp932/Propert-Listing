import { Request } from "express";
import { TokenPayload } from "../utility/token";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}