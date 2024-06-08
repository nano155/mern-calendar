import { Server } from "./presentation/server.js"
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import 'dotenv/config'
import { AppRoutes } from "./presentation/routes.js";
import { MongoConnect } from "./services/dao/mongo/mongo.connect.js";
import moment from "moment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


(()=>{

    main()

})()


function main () {
    const publicPath = `${__dirname}/public`
    const server = new Server({
        port:process.env.PORT,
        publicPath:publicPath,
        routes: AppRoutes.routes
    })

//     const hora = new Date().getTime()

//     const initialHour = moment(hora)

//     const horaLimit = moment(1717102815232).add(1, "minute")

//    console.log(initialHour > horaLimit);


    const mongoConect = new MongoConnect({
        url: process.env.MONGO_URL,
        dbName: 'mern_calendar'
    })

    mongoConect.start()



    server.start()
}