import mongoose, { Schema } from "mongoose";


const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    images: {
        type: [String],  
        default: []
    },
    owner: {
        type: Schema.Types.ObjectId,  
        ref: "User",
        required: true
    }
});

export const Car = mongoose.model('Car', cardSchema);
