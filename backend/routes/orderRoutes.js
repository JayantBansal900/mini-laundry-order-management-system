import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardData
} from "../controllers/orderController.js";

const router = express.Router();

// DASHBOARD
router.get("/dashboard", getDashboardData);

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS + FILTERS
router.get("/", getOrders);

// UPDATE ORDER STATUS
router.put("/:id/status", updateOrderStatus);

export default router;