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
      const formattedErrors = errorFormatter(error);
      return validationErrorResponse(res, formattedErrors);
      // return validationErrorResponse(res, error.details[0].message)
    }
    next()
  }
}

const errorFormatter = (error: Joi.ValidationError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {}; // Keys are strings, and values are strings

  error.details.forEach((detail: Joi.ValidationErrorItem) => {
    // If path is an array, join it with '.'. Otherwise, use it directly.
    const path = Array.isArray(detail.path) ? detail.path.join('.') : String(detail.path);
    formattedErrors[path] = detail.message;
  });

  console.log(formattedErrors);
  return formattedErrors;
};
