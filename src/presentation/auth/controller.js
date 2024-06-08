import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserService } from "../../services/dao/mongo/services/user.service.js";

export class AuthController {
  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserService.createUser({ name, email, password });
      res.status(201).json({
        ok:true,
        uid: newUser.id,
        name: newUser.name
      });
    } catch (error) {
      console.log(error.message);
      
    }
  };
  static loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;  
        const loginUser = await UserService.loginUser({email, password}) 
        res.cookie('token', loginUser.token)
        res.status(200).json({
          loginUser,
          msg: "login",
        });
        
    } catch (error) {
        console.log(error.message);
      res.status(400).json({
        ok: false,
        msg: "Hable con el administrador",
      }); 
    }
  };
  static renewUser = async (req, res) => {
    const uid = req.uid
    const name = req.name

    const token = await JwtAdapter.generate({uid, name})


    res.json({
      ok: true,
      token
    });
  };
}
