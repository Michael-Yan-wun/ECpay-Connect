/**
 * 會員相關 API
 */
const express = require('express');
const router = express.Router();
const db = require('../../lib/db');

// 登入
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: '請輸入帳號密碼' });
    }

    const user = db.login(email, password);

    if (!user) {
        return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    res.json({ user });
});

// 登出
router.post('/logout', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        db.logout(token);
    }
    res.json({ success: true });
});

// 取得目前使用者
router.get('/me', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = db.getUserByToken(token);

    if (!user) {
        return res.status(401).json({ error: '未登入' });
    }

    res.json({ user });
});

module.exports = router;
