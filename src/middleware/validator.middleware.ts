import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { internalServer, validationErrorResponse } from '../shared/utils/response'


export const validate = (schemaObject: Joi.ObjectSchema)  => {
  
  
  return (req: Request, res: Response, next: NextFunction) => {
    const schema: Joi.ObjectSchema | Joi.ArraySchema = schemaObject
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
      console.log('error: ', error.details[0].path);
      return validationErrorResponse(res, error.details[0].message)
    }

    next()
  }
}
