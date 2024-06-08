import { Router } from "express";
import { CalendarController } from "./controller.js";
import { ValidatorsField } from "../../middlewares/validar-campos.js";
import { check } from "express-validator";
import { isDate } from "../../config/isdate.js";

export class CalendarRoutes {
  static get routes() {
    const router = Router();

    router.use(ValidatorsField.validateJwt);

    router.get("/", CalendarController.getEvents);
    router.post(
      "/",
      [
        check("title", "El titulo es oblicatorio").not().isEmpty(),
        check("start", "El tipo de dato debe ser Date").custom(isDate),
        check("end", "El tipo de dato debe ser Date").custom(isDate),
        ValidatorsField.validarCampos,
      ],
      CalendarController.createEvent
    );
    router.put("/:id", CalendarController.updateEvents);
    router.delete("/:id", CalendarController.deleteEvents);

    return router;
  }
}
