import mongoose from "mongoose";

global.mongoose = {
    conn: null,
    promise: null,
}

const dbConnect = async() => {

    try {
        const connString = process.env.MONGO_URI;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        }

        const promise = await mongoose.connect(connString, options)
        console.log("DB Connected");
        return promise
        
       
      } catch (error) {
        console.log(error);
      }

      try {
        
        if(global?.mongoose?.conn){
            console.log("Existing DB Connection")
            return global.mongoose.conn;
        }
        else {
            console.log("New DB Connection");
            const connString = process.env.MONGO_URI;
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true,
            }

            const promise = await mongoose.connect(connString, options)
            
            global.mongoose = {
                conn: promise,
                promise,
            }

            return promise
        }

      } catch (error) {
        console.log(error)
      }
}

export default dbConnect;
