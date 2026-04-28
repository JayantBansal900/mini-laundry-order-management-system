import express from "express";

import {
  createOrder,
  getOrders
} from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS + FILTERS
router.get("/", getOrders);

export default router;