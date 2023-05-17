import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },

    profilePicUrl: { type: String },
    
    role: { type: String, default: "user", enum: ["user", "root"] },
})

export default mongoose.models.Users || mongoose.model("Users", UserSchema);

