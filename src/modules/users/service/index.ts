import { FindOptions } from 'sequelize'
import { ICreateUser, IUserResponse } from '../../../database/types/user.types'

class UserService {
  
  async findOne(data: FindOptions<ICreateUser>): Promise<IUserResponse | null> {
    console.log("Successfully working!");
    throw new Error("It's error")
    return null
    // const user = await User.findOne(data)
    // if (!user) return user
    // const { password, ...userWithoutPassword } = user 
    // return userWithoutPassword
  }
}

const userService = new UserService()

export default userService
