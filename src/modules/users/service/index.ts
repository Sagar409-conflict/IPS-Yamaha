import { FindOptions } from 'sequelize'
import User from '../../../database/entities/user.entities'
import { ICreateUser, IUserResponse } from '../../../database/types/user.types'

class UserService {
  
  async findOne(data: FindOptions<ICreateUser>): Promise<IUserResponse | null> {
    const user = await User.findOne(data)
    if (!user) return user
    const { password, ...userWithoutPassword } = user // Omit password
    return userWithoutPassword
  }
}

const userService = new UserService()

export default userService
