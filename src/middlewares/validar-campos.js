import { validationResult } from "express-validator"
import { JwtAdapter } from "../config/jwt.adapter.js"


export class ValidatorsField{

    static validarCampos = (req, res, next) =>{

        const errors = validationResult(req)
        
        if(!errors.isEmpty()) return res.status(400).json({ok:false, error: errors.mapped()})
            
        next()

    }

    static validateJwt = async (req, res, next) =>{
        const {token} = req.cookies;

        if(!token) {
            res.status(401).json({
                ok:false,
                msg:'No hay token en la peticions'
            })
        }

        try {

            const {name, uid} = await JwtAdapter.tokenValidate(token)

            req.uid = uid
            req.name = name
                    
            next()
        } catch (error) {
            return res.status(401).json({
                ok:false,
                msg:'Token not valid'
            })
        }

    }
}