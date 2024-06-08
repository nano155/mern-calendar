import jwt from "jsonwebtoken";

export class JwtAdapter {
  static generate(uid, name) {
    return new Promise((resolve, reject) => {
      const payload = { uid, name };

      jwt.sign(
        payload,
        process.env.SECRET_SEED,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) {
            console.log(err);
              reject('No se pudo generar el token');
          }

          resolve(token);
        }
      );
    });
  }

  static tokenValidate(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.SECRET_SEED,
            (err, decoded)=>{
                if(err){
                    console.log(err);
                    reject('El token no coincide')
                }
                resolve(decoded)

        })
    })
  }
}
