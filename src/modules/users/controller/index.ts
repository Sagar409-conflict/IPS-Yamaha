import { Request, RequestHandler, Response } from "express"
import userService from "../service"
import { apiHandler, apiHandlerWithTransaction } from "../../../middleware/globalErrorhandler.middleware";

class AuthController {
  register: RequestHandler = apiHandlerWithTransaction(async (req:Request, res:Response) => {
    const result = await userService.findOne(req.body);
    res.status(200).json({ message: "User registered successfully", result });
  });
}
const authController = new AuthController()
export default authController