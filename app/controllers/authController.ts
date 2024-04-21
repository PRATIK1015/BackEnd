/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { DefaultResponse } from "../helpers/defaultResponseHelper";
import { checkValidation } from "../helpers/validationHelper";
import { hashPassword } from "../helpers/passwordHelper";
import {authService} from '../services'
// import config from "../../config";
// import { CustomError } from "../models/customError";
// import { RequestExtended } from "../interface/global";
import userRepository from "../repository/userRepository";
import { CustomError } from "../models/customError";
import { RequestExtended } from "../interface/global";

class AuthController {
  //Register
  async register(req: Request, res: Response, next: NextFunction) {

    try {
        checkValidation(req)

      const {email}=  req.body

      const checkUserByEmail=await userRepository.getByEmail(email)
      if(checkUserByEmail){
        throw new CustomError(409,"User with this email already register")
      }
      // Hash the user's password
      const hashedPassword = await hashPassword(req?.body?.password);

      req.body.password = hashedPassword;
const data={...req?.body,role:"ADMIN"}
      // Register the user
      const response = await userRepository.register(data);

      // Respond with a success message
      return DefaultResponse(
        res,
        200,
        "Registration successful.Please log in"
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }


  //Log in 
   // Login User
   async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Check request validation
      checkValidation(req);

      // Extract email, password, rememberMe, and confirmOverRide from the request body
      const { email, password } = req.body;

      // Attempt to log in the user
      const user: any = await authService.login(
        email.toLowerCase(),
        password
      );

      // Destructure user properties and remove sensitive information
      const {
        password: userPassword,
        ...finalUser
      } = user;
      // Respond with a success message and the user data
      return DefaultResponse(
        res,
        200,
        "User logged in successfully",
        finalUser
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }

  async fetchProfile(req: RequestExtended, res: Response, next: NextFunction) {

    try {
      const userDetails=await userRepository.getById(req?.user?.id)
      if(!userDetails){
        throw new CustomError(404,"Fail to fetch user profile")
      }
const {password,...rest}=userDetails
      // Respond with a success message
      return DefaultResponse(
        res,
        200,
        "Successfully fetch user profile",
        rest
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }

}


export default new AuthController();