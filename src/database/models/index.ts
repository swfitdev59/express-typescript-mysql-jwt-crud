import { sequelize } from "../connection";
import { User } from "./User";

export const models = {
    User: User.initialize(sequelize),
}