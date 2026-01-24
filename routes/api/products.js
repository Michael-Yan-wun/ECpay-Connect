/**
 * 產品相關 API
 */
const express = require('express');
const router = express.Router();
const products = require('../../data/products');

// 取得所有產品
router.get('/', (req, res) => {
    res.json(products);
});

// 取得單一產品
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

module.exports = router;
