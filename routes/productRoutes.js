const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {

    addProduct,
    getProducts,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");

router.post("/", authMiddleware, adminMiddleware, addProduct);

router.get("/", getProducts);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;