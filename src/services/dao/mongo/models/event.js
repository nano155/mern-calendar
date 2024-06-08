import mongoose from "mongoose";


const EventSchema = new  mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    notes:{
        type:String
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true 
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: true
    }

})

EventSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id
    }
})

export const EventModel = mongoose.model('Event', EventSchema)