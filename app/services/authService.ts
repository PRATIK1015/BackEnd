
import config from "../../config";

import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import {
  generateAccessToken,
  generateRefreshToken,
  isTokenExpired,
  // isTokenExpired,
  verifyAccessToken,
} from "../helpers/tokenHelper";
import { CustomError } from "../models/customError";
import { decode } from "jsonwebtoken";
import userRepository from "../repository/userRepository";

class AuthServices {
  async login(email: string, password: string) {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new CustomError(404, "User does not exist"); // 404 Not Found - The user with the given email does not exist.
    }

    const isPasswordValid = await comparePassword(password, user.password!);

    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid credentials"); // 401 Unauthorized - The provided credentials (password) are invalid.
    }

      // Token cannot be verified or is expired, generate a new one
      const newAccessToken = generateAccessToken({
        id: user.id,
        email,
        role:user.role
      });

      const newRefreshToken = generateRefreshToken({
        id: user.id,
        email,
        role:user.role
      });

      return {...user,accessToken:newAccessToken,refreshToken:newRefreshToken};
  }

 
}

export default new AuthServices();
