import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserService } from "../../services/dao/mongo/services/user.service.js";

export class AuthController {
  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserService.createUser({ name, email, password });
      res.cookie('token', newUser.token, { httpOnly: true, secure: true, sameSite: 'None'})
      res.status(201).json({
        newUser
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        ok: false,
        msg: error.message,
      }); 
      
    }
  };
  static loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;  
        const loginUser = await UserService.loginUser({email, password}) 
        res.cookie('token', loginUser.token, { httpOnly: true, secure: true, sameSite: 'None' })
        res.status(200).json({
          ok:true,
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
      uid, 
      name,
      token
    });
  };

  static logout = (req, res) =>{
    res.clearCookie('token', {
      httpOnly: true,
      secure: true, // Cambia esto si estás usando HTTPS
      sameSite: 'None' // Igual que la configuración de creación de la cookie
  });
  res.status(200).json({ message: 'Cookie deleted successfully' });
  }
}
