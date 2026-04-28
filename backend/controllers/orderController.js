import Order from "../models/orderModel.js";
import { PRICE_MAP } from "../utils/priceMap.js";

// CREATE ORDER
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

// GET ALL ORDERS + FILTERS
export const getOrders = async (req, res) => {
  try {
    const { status, customerName, phone } = req.query;

    let filter = {};

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by customer name
    if (customerName) {
      filter.customerName = {
        $regex: customerName,
        $options: "i"
      };
    }

    // Filter by phone
    if (phone) {
      filter.phone = phone;
    }

    const orders = await Order.find(filter).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};