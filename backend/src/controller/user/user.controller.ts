import { Request, Response } from "express";
import { IUserController } from "../../interface/user/IUserController";
import { IUserService } from "../../interface/user/IUserService";
import { HttpStatus } from "../../utility/httpStatusCode";
export class UserController implements IUserController {
  constructor(private _userSerivce: IUserService) {}

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

         res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });

      return ;
    } catch (error) {
      const err = error as Error;
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  }
}
