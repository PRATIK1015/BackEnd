import { prisma } from "../client/prisma";
import UserInfo from "../interface/userInterface";

class UserRepository {
  //Register
  async register(RegisterData: UserInfo) {
    try {
      const user = await prisma.user.create({
        data: RegisterData,
      });
      return user;
    } catch (err) {
      throw err;
    }
  }


  async getByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where:{
            email:email
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getById(id:number) {
    try {
      const user = await prisma.user.findUnique({
        where:{
            id:id
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserRepository();