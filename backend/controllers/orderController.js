import Order from "../models/orderModel.js";
import { PRICE_MAP } from "../utils/priceMap.js";

export const createOrder = async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;

    if (!customerName || !phone || !garments?.length) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    let totalAmount = 0;

    const processedGarments = garments.map((item) => {
      const pricePerItem = PRICE_MAP[item.type] || 100;

      const itemTotal = pricePerItem * item.quantity;

      totalAmount += itemTotal;

      return {
        type: item.type,
        quantity: item.quantity,
        pricePerItem
      };
    });

    const orderId = `ORD-${Date.now()}`;

    const estimatedDeliveryDate = new Date();

    estimatedDeliveryDate.setDate(
      estimatedDeliveryDate.getDate() + 3
    );

    const order = await Order.create({
      orderId,
      customerName,
      phone,
      garments: processedGarments,
      totalAmount,
      estimatedDeliveryDate
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) { 
    res.status(500).json({
      message: error.message
    });
  }
};