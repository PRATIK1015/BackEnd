/* eslint-disable @typescript-eslint/no-var-requires */
const { validationResult } = require("express-validator");
import { Request } from "express";

// Check Validation For Requests
export const checkValidation = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = {
      status: 400,
      //   status: 422,
      message: errors.errors[0].msg,
    };
    throw validationError;
  }
};

function isBlank(value: any) {
  return (
    null === value ||
    undefined === value ||
    value.toString().trim().length === 0
  );
}

export function hasText(value: any) {
  return !isBlank(value);
}
