import { BcryptAdapter } from "../../../../config/bcrypt.adapter.js";
import { JwtAdapter } from "../../../../config/jwt.adapter.js";
import { UserModel } from "../models/user.js";

export class UserService {
  static async createUser(user) {
    try {
      const existUser = await UserModel.findOne({ email: user.email });
      if (existUser) throw new Error("User already exist in db!");
  
      const { password, ...rest } = user;
      const newUser = new UserModel({
        password: BcryptAdapter.hash(user.password),
        ...rest,
      });
      if (!newUser) throw new Error("Internal error!");
  
      await newUser.save();
      const token = await JwtAdapter.generate(newUser.id, newUser.name);
  
      return {
        ok: true,
        uid: newUser.id,
        name: newUser.name,
        token,
      }; 
    } catch (error) {
      throw Error(error.message)
      
    }
  }

  static async loginUser(user) {
    try {
      
      const userFound = await UserModel.findOne({ email: user.email });
      if (!userFound) throw new Error("User not found");
  
      const validPassword = BcryptAdapter.compare(
        user.password,
        userFound.password
      );
  
      if (!validPassword) throw new Error("invalid password");
  
      const token = await JwtAdapter.generate(userFound.id, userFound.name);
  
      return {
        ok: true,
        uid: userFound.id,
        name: userFound.name,
        token,
      };
    } catch (error) {
      throw Error(error.message)
    }
  }
}
