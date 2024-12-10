import { Router } from 'express'
import authController from '../controller/index'
import  {validate}  from '../../../middleware/validator.middleware'
import { registerValidation } from '../validations'
const authRoutes = Router()

/**
 * User Routes
 */
authRoutes.post('/',authController.register)
// authRoutes.post('/', validate(registerValidation),authController.register)

// authRoutes.post('/login',()=>{
//   console.log("login")
// })

export default authRoutes
