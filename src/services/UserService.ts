import { User } from "../database/models/User";
import { sequelize as db } from "../database/connection";

User.initialize(db);

class UserService {
  public get(criteria: any = {}, projection: any = []) {
    let config: any = {};
    if (criteria.length > 0) {
      config.criteria = criteria;
    }
    if (projection.length > 0) {
      config.attributes = projection;
    }

    return new Promise((resolve, reject) => {
      User.findAll(config)
        .then((result) => {
          resolve(result);
        })
        .catch(function (err) {
          console.log("Error on fetching users", err);
          reject(err);
        });
    });
  }

  public create(data: any) {
    return new Promise((resolve, reject) => {
      User.create(data)
        .then(function (obj: any) {
          resolve(obj);
        })
        .catch(function (err) {
          console.log("Error on inserting user", err);
          reject(err);
        });
    });
  }

  public insertorUpdate(criteria: any, data: any) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: criteria,
      })
        .then(function (obj: any) {
          if (obj) {
            obj = obj.update(data);
          } else {
            obj = User.create(data);
          }
          resolve(obj);
        })
        .catch(function (err) {
          console.log("Error on inserting or updating user", err);
          reject(err);
        });
    });
  }

  public update(criteria: any, objToSave: Partial<User>) {
    return new Promise((resolve, reject) => {
      User.update(objToSave, { where: criteria })
        .then((result) => {
          resolve(result);
        })
        .catch(function (err) {
          console.log("Error on updating user", err);
          reject(err);
        });
    });
  }

  public find = (criteria: any) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: criteria,
      })
        .then((result) => {
          resolve(result);
        })
        .catch(function (err) {
          console.log("Error on fetching user details", err);
          reject(err);
        });
    });
  };

  public count(criteria: any) {
    return new Promise((resolve, reject) => {
      User.count({
        where: criteria,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("Error in getting count for users", err);
          reject(err);
        });
    });
  }
}

export { UserService };
