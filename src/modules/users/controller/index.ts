import { Request, RequestHandler, Response } from "express"
import userService from "../service"
import { apiHandler } from "../../../middleware/globalErrorhandler.middleware";
import { sendSuccess } from "../../../middleware/apiHandler.middleware";

class AuthController {
  register: RequestHandler = apiHandler(async (req:Request, res:Response) => {
    const result = await userService.findOne(req.body)
    sendSuccess({res,message:'Fetched successfully',data:result})
  })
}
const authController = new AuthController()
export default authController