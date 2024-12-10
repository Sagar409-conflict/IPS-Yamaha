import Joi from 'joi'
import { ROLES_ARRAY } from "../../../shared/constant/constant";

export const registerValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  country_code: Joi.string().required(),
  mobile_number: Joi.string().required(),
  role: Joi.string()
    .valid(...ROLES_ARRAY)
    .required(),
})