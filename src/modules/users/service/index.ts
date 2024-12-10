import { FindOptions } from 'sequelize'
import { ICreateUser, IUserResponse } from '../../../database/types/user.types'
import { sendAPIerror, sendSuccess } from '../../../middleware/apiHandler.middleware';
import { responseMessage } from '../../../utils/responseMessage';

class UserService {
  
  async findOne(data: FindOptions<ICreateUser>): Promise<IUserResponse | null> {
    // console.log("Successfully working!");
    sendAPIerror(400,responseMessage('success')) 
    // throw new Error("It's error")
    return null
    // const user = await User.findOne(data)
    // if (!user) return user
    // const { password, ...userWithoutPassword } = user 
    // return userWithoutPassword
  }
}

const userService = new UserService()

export default userService
