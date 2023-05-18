import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const CartSchema = new Schema({

    userId: {type: Schema.Types.ObjectId, ref: "Users"},
    status: {type: String, default: 'inactive', enum: ['inactive', 'active']},
    quantity: {type: Number, default: 1},
    products: [
        {
            type: Schema.Types.ObjectId, ref: "Products"
        }
    ]

})


export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
