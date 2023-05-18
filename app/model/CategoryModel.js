import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: {
        type: String, required: true,
    },
    isActive: {
        type: Boolean, default: true
    }
})


export default mongoose.models.Category || mongoose.model('Category', CategorySchema)