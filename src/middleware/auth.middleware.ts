import { Request, Response, NextFunction } from 'express'
import { internalServer, unAuthorized } from '../shared/utils/response'
import userService from '../modules/users/service'
import { IUser, IUserTokenPayload } from '../database/types/user.types'
import { CONFIG } from '../config/config'
import { LANGUAGE_CODE } from '../shared/constant/constant'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user: Pick<IUser, 'email' | 'first_name' | 'last_name' | 'id' | 'role'>
    }
  }
}

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const languageCode: string = (req.headers.languagecode as string) ?? LANGUAGE_CODE.IT
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return unAuthorized(res, languageCode)
    }

    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7, authorization.length)
      : authorization
    const reqUser = await commonValidation(req, res, token)

    if (!reqUser) {
      return unAuthorized(res, languageCode)
    }

    const user = await userService.findOne({
      where: { id: reqUser.id, email: reqUser.email },
    })

    if (!user) {
      return unAuthorized(res, languageCode)
    }
    req.user = reqUser
    next()
  } catch (error) {
    console.error('🐛 ERROR 🐛', error)
    return internalServer(res, languageCode, req.body, undefined, (error as Error).message)
  }
}
const commonValidation = async (
  req: Request,
  res: Response,
  token: string
): Promise<IUserTokenPayload | void> => {
  const payload = verifyToken(token)

  //   if (!payload?.user || payload?.ip !== req.ip) {
  //     throw new Error('Token is invalid!')
  //   }

  const reqUser: IUserTokenPayload = payload.user

  return reqUser
}
export const checkRole = (requiredRoles: string[]) => {
  const languageCode: string = LANGUAGE_CODE.IT

  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role
    if (!userRole || !requiredRoles.includes(userRole)) {
      return unAuthorized(res, languageCode)
    }
    next()
  }
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, CONFIG.JWT_SECRET, {
    ignoreExpiration: false,
  }) as JwtPayload
}
