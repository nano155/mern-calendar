import mongoose from "mongoose";


export class MongoConnect {

    constructor({url, dbName}){
        this.url=url
        this.dbName= dbName
    }


    async start(){
        try {
            await mongoose.connect(this.url, {
                dbName: this.dbName
            })

            console.log('Conectado con exito a la DB');
            
        } catch (error) {
            console.log(error);
            throw new Error('Error inicializando BD')
            
        }
        
    }
}