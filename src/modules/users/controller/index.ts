import { Request, Response } from "express"
import { internalServer } from "../../../shared/utils/response"

class AuthController {

  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async register(req: Request, res: Response) {
    
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  /****************************************
   * REST API endpoint for login user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async login(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  async forgotPassword(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  async verifyOTP(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  async resendOTP(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  /**
   * REST API endpoint for reset the password in case user forgot
   * @param req
   * @param res
   * @returns
   */
  async resetPassword(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }

  /*************************************************************************
   * REST API endpoint for change password (User has to mandatory logged in)
   * @param req
   * @param res
   * @returns
   ************************************************************************/
  async changePassword(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }
  /**
   * REST API endpoint for login user can update their profile
   * @param req
   * @param res
   */
  async updateProfile(req: Request, res: Response) {
    return internalServer(res, "en", req.body, undefined, "INTERNAL_SERVER_ERROR")
  }
}
const authController = new AuthController()
export default authController