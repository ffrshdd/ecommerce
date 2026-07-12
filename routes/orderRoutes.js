const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    createOrder,

    getOrders,

    updateOrder

} = require("../controllers/orderController");

router.post("/", authMiddleware, createOrder);

router.get("/", authMiddleware, getOrders);

router.put("/:id", authMiddleware, updateOrder);

module.exports = router;