import mongoose from "mongoose";



const connectDB = async()=>{
    try {
        const connectionInstance =  await mongoose.connect(`mongodb+srv://harshsrivastav2111:BYUITVavy9sz2OQo@cluster0.hs69d.mongodb.net/Spyne`)
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Mongo Db FAILED",error )
        process.exit(1)
    }
}

export default connectDB
