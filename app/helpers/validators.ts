import { param } from "express-validator";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { body } = require("express-validator");

// Login validation rules
export const loginValidationRules = [
  // Validate email
  body("email").isEmail().withMessage("Email is required"),

  // Validate password
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidationRules = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("username").notEmpty().withMessage("username is required"),
  ];


  export const addTaskValidationRules = [
      body("title").notEmpty().withMessage("Title is required"),
      body("description").optional().isString().withMessage("Description must be a string"),
      body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
  ];
  export const updateTaskValidationRules = [
    body("id").notEmpty().withMessage("id is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
    // body("userId").optional().isNumeric().withMessage("Number field must be a number"),
];
export const deleteTaskRules = [
  param("id").trim().notEmpty().withMessage("Account id is required"),
];
  