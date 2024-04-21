import { NextFunction, Request, Response } from "express";
import { DefaultResponse } from "../helpers/defaultResponseHelper";
import { checkValidation } from "../helpers/validationHelper";
import { RequestExtended } from "../interface/global";
import taskRepository from "../repository/taskRepository";
import { CustomError } from "../models/customError";
import userRepository from "../repository/userRepository";

class TaskController {
  async addTask(req: RequestExtended, res: Response, next: NextFunction) {

    try {
      checkValidation(req)
      
      // Register the user
      if(req.user.role!=="ADMIN"){
        throw new CustomError(401,"User has not access to create task")
      }
      const task = await taskRepository.createTask(req.body);

      // Respond with a success message
      return DefaultResponse(
        res,
        200,
        "Task added successful.",
        task
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }


  async getTask(req: RequestExtended, res: Response, next: NextFunction) {

    try {
      checkValidation(req)
      // Register the user

      const user=await userRepository.getById(req.user.id)
      if(!user){
        throw new CustomError(404,"user not found")
      }
     
       const task=await taskRepository.getAllTask()

      return DefaultResponse(
        res,
        200,
        "Task fetched successful.",
        task
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }

  async deleteTask(req: RequestExtended, res: Response, next: NextFunction) {
    try {
      checkValidation(req)
      const { id } = req?.params

     
      if(req.user.role!=="ADMIN"){
        throw new CustomError(401,"User has not access to delete task")
      }
      const checkTask=await taskRepository.getTaskById(Number(id))
      if(!checkTask){
        throw new CustomError(404,"Task not found")
      }
      const task = await taskRepository.deleteTask(Number(id));

      // Respond with a success message
      return DefaultResponse(
        res,
        200,
        "Task deleted successful.",
        task
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }

  async updateTask(req: RequestExtended, res: Response, next: NextFunction) {
    try {
      checkValidation(req)

      if(req.user.role!=="ADMIN"){
        throw new CustomError(401,"User has not access to delete task")
      }
      const checkTask=await taskRepository.getTaskById(req?.body?.id)
      if(!checkTask){
        throw new CustomError(404,"Task not found")
      }
      const task = await taskRepository.updateTask(req.body);

      // Respond with a success message
      return DefaultResponse(
        res,
        200,
        "Task updated successful.",
        task
      );
    } catch (err) {
      // Handle errors and pass them to the next middleware
      next(err);
    }
  }
}


export default new TaskController();