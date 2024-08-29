import bcrypt from "bcrypt";
import { Response } from "express";
import { status } from "./status";
import { ApiResponse } from "./interface";

export const sendSuccessMessage = (res: Response, data: any, message: string) => {
  const response: ApiResponse = {
    statusCode: status.SUCCESS_STATUS_CODE,
    message: message,
    data: data || {},
  };
  res.status(status.SUCCESS_STATUS_CODE).send(response);
};

export const sendErrorMessage = (res: Response, error: any) => {
  const response: ApiResponse = {
    statusCode: status.ERROR_STATUS_CODE,
    message: error.isJoi ? error.details[0].message : error.message,
  };
  res.status(status.ERROR_STATUS_CODE).send(response);
};

export const verifyPayload = async (request: any, requestSchema: any) => {
  try {
    const value = await requestSchema.validateAsync(request);
    return value;
  } catch (error) {
    throw error;
  }
};

export const randomPassword = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const hashPassword = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 15);
  return hash;
};

export const comparePassword = async (password: string, encryptedPassword: string) => {
  const result = await bcrypt.compare(password, encryptedPassword);
  return result;
};
