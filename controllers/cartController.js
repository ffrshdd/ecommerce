const Cart = require("../models/Cart");

// Add to Cart
exports.addToCart = async (req, res) => {

    try {

        const cart = await Cart.create({

            user: req.user.id,

            product: req.body.product,

            quantity: req.body.quantity

        });

        res.status(201).json(cart);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// View Cart
exports.getCart = async (req, res) => {

    try {

        const cart = await Cart.find({

            user: req.user.id

        }).populate("product");

        res.json(cart);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Remove Item
exports.removeFromCart = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({

            message: "Item Removed"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};