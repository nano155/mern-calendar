import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'



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

        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended:true}))

        this.#app.use(cors())
        this.#app.use(cookieParser())
        
        
        this.#app.use(express.static(this.#publicPath))
        
        this.#app.use(this.#routes)


        this.#app.listen(this.#port, ()=>{
            console.log(`server runing in port: ${this.#port}`)
        })
    }
}