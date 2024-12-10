import { statusCode } from "../shared/constant/statusCode"
import { CustomError } from '../types/types'
import { Response } from 'express'

export const sendAPIerror = (statusCode: number, message: string) => {
  const error: CustomError = new Error(message || 'Internal Server Error')
  error.statusCode = statusCode || 500
  throw error
}

interface SuccessResponseOptions {
  res: Response;
  message?: string;
  data?: unknown | null;
  status?: number;
}

export const sendSuccess = ({
  res,
  message = 'success',
  data = null,
  status = 200,
}: SuccessResponseOptions): void => {
  const response: Record<string, unknown> = {
    message,
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  res.status(status).json(response);
};


