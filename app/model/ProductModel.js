import mongoose from 'mongoose';
const Schema = mongoose.Schema

const ProductSchema  = new Schema({

    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true },
    quantity: {type: Number, required: true},
    image : [
        {
            type: String
        }
    ],
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    // isActive: {type: Boolean, default : quantity > 0 ? true : false}
    isActive: {type: Boolean, default: true}
})


export default mongoose.models.Products || mongoose.model("Product", ProductSchema)