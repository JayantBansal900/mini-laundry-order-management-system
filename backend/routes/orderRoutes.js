import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS + FILTERS
router.get("/", getOrders);

// UPDATE ORDER STATUS
router.put("/:id/status", updateOrderStatus);

export default router;