import {
  verifyPayload,
  hashPassword,
  comparePassword,
} from "../config/utils";
import { Request } from "express";
import jwtToken from "jsonwebtoken";
import { UserService } from "../services/UserService";
import { env } from "../config/env";
const Joi = require("joi");

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async signin(req: Request) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        password: Joi.string().required(),
      });

      const payload = await verifyPayload(req.body, schema);
      if (payload.error == null) {
        const criteria = { email: payload.email };
        const data: any = await this.userService.find(criteria);
        if (data) {
          const result: any = await comparePassword(payload.password, data.password);
          if (result) {
            const token = await jwtToken.sign({ id: data.id }, env.SECRET);
            return { token: token };
          }
          throw { message: "Incorrect Password" };
        }
        throw { message: "User not found" };
      }
    } catch (err) {
      throw err;
    }
  }

  async get() {
    try {
      const projection = [
        "id",
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "address",
      ];
      const users = await this.userService.get({}, projection);
      return users;
    } catch (err) {
      throw err;
    }
  }

  async find(req: Request) {
    try {
      const schema = Joi.object().keys({
        id: Joi.number().required(),
      });

      const payload = await verifyPayload(req.params, schema);
      if (payload.error == null) {
        const id = payload.id;
        const criteria = { id: id };
        const data = await this.userService.find(criteria);
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  async create(req: Request) {
    try {
      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        address: Joi.string().required(),
        password: Joi.string().required(),
      });

      const payload = await verifyPayload(req.body, schema);
      if (payload.error == null) {
        const hashedPassword = await hashPassword(payload.password);

        const data = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
          password: hashedPassword,
        };
        const result = await this.userService.create(data);
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  async update(req: Request) {
    try {
      const querySchema = Joi.object().keys({
        id: Joi.number().required(),
      });

      const payloadSchema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        address: Joi.string().required(),
      });

      const queryBody = await verifyPayload(req.params, querySchema);
      const payload = await verifyPayload(req.body, payloadSchema);

      if (payload.error == null && queryBody.error == null) {
        const criteria = { id: queryBody.id };
        const data = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
        };

        const result = await this.userService.update(criteria, data);
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(req: Request) {
    try {
      const querySchema = Joi.object().keys({
        id: Joi.number().required(),
      });

      const queryBody = await verifyPayload(req.params, querySchema);
      if (queryBody.error == null) {
        const criteria = { id: queryBody.id };
        const data = {
          isDeleted: true,
        };

        const result = await this.userService.update(criteria, data);
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
}

export { UserController };
