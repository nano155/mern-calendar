import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class Server {
    #app = express();
    #port;
    #publicPath;
    #routes;

    constructor({port, publicPath ='/public', routes}){
        this.#port = port
        this.#publicPath = publicPath
        this.#routes = routes
    }

    async start (){

        const corsOptions = {
            origin: 'http://127.0.0.1:5173', // Reemplaza esto con tu dominio permitido
            credentials: true, // Habilita las cookies
          };

        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended:true}))

        this.#app.use(cors(corsOptions))
        this.#app.use(cookieParser())
        
        
        this.#app.use(express.static(this.#publicPath))
        
        this.#app.use(this.#routes)

        this.#app.use('*', (req, res) => {
            res.sendFile(path.join(this.#publicPath, 'index.html'));
        });


        this.#app.listen(this.#port, ()=>{
            console.log(`server runing in port: ${this.#port}`)
        })
    }
}