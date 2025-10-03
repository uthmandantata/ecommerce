import mongoose from "mongoose"



const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: Number,
        default: "pending"
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;