import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { CalendarRoutes } from "./calendar/routes.js";


export class AppRoutes{

    static get routes(){
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/calendar', CalendarRoutes.routes)
        
        return router
    }
}