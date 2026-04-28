import mongoose from "mongoose";

const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  pricePerItem: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true
    },

    customerName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    garments: [garmentSchema],

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
      default: "RECEIVED"
    },

    estimatedDeliveryDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;