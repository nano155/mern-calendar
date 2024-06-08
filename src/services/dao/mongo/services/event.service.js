import { EventModel } from "../models/event.js";


export class EventService {

    static async createEvent(event, uid){

        try {
            
            const newEvent = new EventModel({
                user:uid,
                ...event
            })
    
            const dBEvent = await newEvent.save()

            return dBEvent
        } catch (error) {
            return error.message
        }
    }

    static async getEvents(event){
        try {
            const events = await EventModel.find()
            .populate('user', 'name');

            return events
            
        } catch (error) {
            throw error
        }
    }

    static async updateEvent(event, id, uid){
        try {
            const evento = await EventModel.findById(id);
            if(!evento) throw new Error("Event doesn't found")
                if(evento.user.toString() !== uid){
                    throw new Error('unauthorized!')
                }
                const nuevoEvento = {
                    ...event,
                    user:uid
                }
            const eventUpdate = await EventModel.findByIdAndUpdate({_id:id}, nuevoEvento, {new:true})
        

            return eventUpdate
            
        } catch (error) {

            throw error
            
        }
    }
    static async deleteEvent(id, uid){
        try {
            const evento = await EventModel.findById(id);
            if(!evento) throw new Error("Event doesn't found")

                if(evento.user.toString() !== uid){
                    throw new Error('unauthorized!')
                }
            const eventUpdate = await EventModel.findByIdAndDelete({_id:id})
        

            return eventUpdate
            
        } catch (error) {

            throw error
            
        }
    }
}