import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { internalServer, validationErrorResponse } from '../shared/utils/response'
import {
  MODULE_IDENTIFIRES,
  ROLES_ARRAY,
  USER_STATUS,
} from '../shared/constant/constant'

const registerSchema = Joi.object({
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

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
})
const statusUpdateSchema = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.string()
    .valid(...Object.values(USER_STATUS))
    .required(),
  module: Joi.string()
    .valid(...Object.values(MODULE_IDENTIFIRES))
    .required(),
})


const schemas: { [key: string]: Joi.ObjectSchema | Joi.ArraySchema } = {
  id: idSchema,
  statusUpdate: statusUpdateSchema,
  register: registerSchema,
  login: loginSchema,
  
}

export const validate = (schemaName: string)  => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema: Joi.ObjectSchema | Joi.ArraySchema = schemas[schemaName]
    if (!schema) {
      return internalServer(res, undefined, undefined, 'NOT_FOUND_VALIDATION_SCHEMA')
    }

    let data
    if (Joi.isSchema(schema) && schema.type === 'array') {
      data = req.body
    } else {
      data = {
        ...req.body,
        ...req.params,
        ...req.query,
      }
    }

    const { error } = schema.validate(data)
    if (error) {
      return validationErrorResponse(res, error.details[0].message)
    }

    next()
  }
}
