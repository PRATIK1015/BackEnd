import express from 'express';
import { authController } from '../controllers';
import { isAuthenticated } from '../middleware/authMiddleware';
import { loginValidationRules, registerValidationRules } from '../helpers/validators';

const router = express.Router();


router.post('/register',registerValidationRules, authController.register);
router.post('/login',loginValidationRules, authController.login);
router.get("/fetchprofile",isAuthenticated, authController.fetchProfile);




export default router;