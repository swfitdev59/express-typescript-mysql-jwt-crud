import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { UserAttributes } from "../../config/interface";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public email!: string;
  public address!: string;
  public password?: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },

        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        phoneNumber: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
        },

        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: true,
        },

        address: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize: sequelize,
        modelName: "users",
        tableName: "users",
        timestamps: true,
      }
    );
  }
}

export { User };
