const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {

    try {

        const order = await Order.create({

            user: req.user.id,

            products: req.body.products,

            totalAmount: req.body.totalAmount

        });

        res.status(201).json(order);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get User Orders
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id

        }).populate("products.product");

        res.json(orders);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Update Order Status
exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(order);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};