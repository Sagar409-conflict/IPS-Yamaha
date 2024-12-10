import { statusCode } from "../shared/constant/statusCode"
import { CustomError } from '../types/types'
export const sendAPIerror = (statusCode: number, message: string, errors?: CustomError) => {
  const error: CustomError = new Error(message || 'Internal Server Error')
  error.statusCode = statusCode || 500
  if (errors.length > 0) {
    error.errors = errorFormatter(errors)
  }
  throw error
}


const errorFormatter = (errors: [{path: number, msg: string}]) => {
  const formattedErrors: Record<number, string> = {}
  errors.forEach((error) => {
    formattedErrors[error.path] = error.msg
  })
  return formattedErrors
}

export const sendSuccess = ({ res , message, data = null }) => {
  const response = { message: message || 'success' }
  if (data) response.data = data
  res.status(statusCode.SUCCESS).send(response)
}


