/**
 * 購物車相關 API
 */
const express = require('express');
const router = express.Router();
const db = require('../../lib/db');

// 中間件：驗證登入
function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = db.getUserByToken(token);

    if (!user) {
        return res.status(401).json({ error: '未登入' });
    }

    req.user = user;
    next();
}

// 取得購物車
router.get('/', requireAuth, (req, res) => {
    const cart = db.getCart(req.user.id);
    res.json({ cart });
});

// 加入購物車
router.post('/', requireAuth, (req, res) => {
    const { product } = req.body;

    if (!product || !product.id) {
        return res.status(400).json({ error: '無效的商品' });
    }

    const item = db.addToCart(req.user.id, product);
    res.json({ success: true, item });
});

// 移除購物車項目
router.delete('/:id', requireAuth, (req, res) => {
    const cartItemId = parseInt(req.params.id);
    db.removeFromCart(req.user.id, cartItemId);
    res.json({ success: true });
});

// 清空購物車
router.delete('/', requireAuth, (req, res) => {
    db.clearCart(req.user.id);
    res.json({ success: true });
});

module.exports = router;
