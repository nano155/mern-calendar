import { Router } from "express";
import { AuthController } from "./controller.js";
import { check } from "express-validator";
import { ValidatorsField } from "../../middlewares/validar-campos.js";

export class AuthRoutes {
  static get routes() {
    const router = Router();

    router.post("/login",[
      check("email", "email is required").isEmail(),
      check("password", "password debe ser de 6 caracteres").isLength({
        min: 6,
      }),
    ], AuthController.loginUser);

    router.post(
      "/register",
      [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is required").isEmail(),
        check("password", "password debe ser de 6 caracteres").isLength({
          min: 6,
        }),
        ValidatorsField.validarCampos
      ],
      AuthController.registerUser
    );

    router.get("/renew",[ValidatorsField.validateJwt],AuthController.renewUser);
    router.get('/clear-cookie', AuthController.logout )

    return router;
  }
}
