import { NextFunction,Request,RequestHandler,Response } from 'express'
import fs from 'fs'

import { Transaction } from 'sequelize'
import dbConnection from '../database/data-source'
import { CustomError } from '../types/types'
// const { deleteLocalFile } = require('../helper/common')

const errorLogStream = fs.createWriteStream('./logs/error.log', { flags: 'a' })

export const apiHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
    async (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };


// Type definition for the service function
export const apiHandlerWithTransaction =
  (serviceFn: (req: Request, res: Response, next: NextFunction, transaction: Transaction) => Promise<void>): RequestHandler =>
    async (req, res, next) => {
      const transaction = await dbConnection.transaction();
      try {
        await Promise.resolve(serviceFn(req, res, next, transaction));
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        next(error);
      }
    };

export const globalErrorHandler = (err: CustomError, req: Request , res: Response, next:NextFunction) => {
  // console.log('err: ', err)
  const statusCode = err.statusCode || 500
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    status: statusCode,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  }
  // if (err?.errors) {
  //   errorResponse.errors = err.errors
  // }

  // if (err instanceof UniqueConstraintError) {
  //   statusCode = 400
  //   errorResponse.status = statusCode
  //   errorResponse.message = 'Duplicate entry found'
  //   delete errorResponse.errors
  // }

  if (statusCode == 500) {
    console.log(err.stack)
    const ruler = '-'.repeat(110)
    const date = new Date(Date.now())
    const errorMessage = `Error occurred at: ${req.path}\n Time:${date.toISOString()}\nMessage: ${err.message}\nStack: ${err.stack}\n${ruler}\n\n`
    errorLogStream.write(errorMessage)
  }

  // if (req.files && Object.keys(req.files).length > 0) {
  //   // Object.keys(req.files).forEach((fieldName) => {
      
  //   //   let fileOrFiles: File[] | File | undefined;
  //   //   if (req.files && req.files[fieldName]){

  //   //     fileOrFiles = req.files[fieldName]
  //   //   }

  //   //   // Handle case where multiple files are uploaded (array)
  //   //   if (Array.isArray(fileOrFiles)) {
  //   //     fileOrFiles.forEach((file) => {
  //   //       deleteLocalFile(file.path)
  //   //     })
  //   //   } else {
  //   //     // Handle case where a single file is uploaded (object)
  //   //     deleteLocalFile(fileOrFiles?.path)
  //   //   }
  //   // })
  // }
  res.status(statusCode).json(errorResponse)
  next()
}



