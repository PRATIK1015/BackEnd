import express from 'express';
import { taskController } from '../controllers';
import { addTaskValidationRules, deleteTaskRules, updateTaskValidationRules } from '../helpers/validators';

const router = express.Router();


router.post('/addtask',addTaskValidationRules, taskController.addTask);
router.get('/gettask', taskController.getTask);
router.put('/edittask',updateTaskValidationRules, taskController.updateTask);
router.delete('/deletetask/:id',deleteTaskRules,taskController.deleteTask);


export default router;