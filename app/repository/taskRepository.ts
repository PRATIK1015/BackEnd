import { prisma } from "../client/prisma";
import Task from "../interface/taskInterface";

class TaskRepository {
  //Register
  async createTask(task: Task) {
    try {
      const {title,description}=task
      const user = await prisma.todo.create({
        data: {
          title:title,
          description:description,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getTask() {
    try {
      
      const todo= await prisma.todo.findMany(
      )
      return todo;
    } catch (err) {
      throw err;
    }
  }

  async getAllTask() {
    try {
      
      const todo= await prisma.todo.findMany()
      return todo;
    } catch (err) {
      throw err;
    }
  }
  async deleteTask(taskId: number) {
    try {
      const deletedTask = await prisma.todo.delete({
       where:{
        id:taskId
       }
      });
      return deletedTask;
    } catch (err) {
      throw err;
    }
  }

  async getTaskById(taskId: number) {
    try {
      const task = await prisma.todo.findFirst({
       where:{
        id:taskId
       }
      });
      return task;
    } catch (err) {
      throw err;
    }
  }
  async updateTask(task: Task) {
    try {
     const {id,...data}=task
      const updateTask = await prisma.todo.update({
        where:{
          id:id
        },
        data:data
      })
      return updateTask;
    } catch (err) {
      throw err;
    }
  }
  
}

export default new TaskRepository();