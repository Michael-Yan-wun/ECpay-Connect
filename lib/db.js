/**
 * SQLite 資料庫初始化
 * 使用 better-sqlite3 同步操作
 */
const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

// 資料庫檔案位置（放在專案根目錄）
const dbPath = path.join(__dirname, '..', 'shop.db');
const db = new Database(dbPath);

// 初始化資料表
db.exec(`
  -- 會員表
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 購物車表
  CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    product_price INTEGER NOT NULL,
    product_image TEXT,
    quantity INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// 檢查是否有預設帳號，沒有則建立
const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('michael@example.com');
if (!existingUser) {
    db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(
        'michael@example.com',
        'password123',
        'Michael'
    );
    console.log('✅ 已建立預設帳號: michael@example.com / password123');
}

// ==================== 會員相關 ====================

/**
 * 登入驗證
 * @param {string} email
 * @param {string} password
 * @returns {object|null} user object with token or null
 */
function login(email, password) {
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
    if (!user) return null;

    // 產生新 token
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('UPDATE users SET token = ? WHERE id = ?').run(token, user.id);

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        token
    };
}

/**
 * 透過 token 取得用戶
 * @param {string} token
 * @returns {object|null}
 */
function getUserByToken(token) {
    if (!token) return null;
    const user = db.prepare('SELECT id, email, name FROM users WHERE token = ?').get(token);
    return user || null;
}

/**
 * 登出（清除 token）
 * @param {string} token
 */
function logout(token) {
    db.prepare('UPDATE users SET token = NULL WHERE token = ?').run(token);
}

// ==================== 購物車相關 ====================

/**
 * 取得用戶購物車
 * @param {number} userId
 * @returns {array}
 */
function getCart(userId) {
    return db.prepare(`
    SELECT id, product_id, product_name, product_price, product_image, quantity
    FROM carts WHERE user_id = ?
  `).all(userId);
}

/**
 * 加入購物車
 * @param {number} userId
 * @param {object} product
 * @returns {object} cart item
 */
function addToCart(userId, product) {
    // 檢查是否已存在
    const existing = db.prepare('SELECT * FROM carts WHERE user_id = ? AND product_id = ?').get(userId, product.id);

    if (existing) {
        // 增加數量
        db.prepare('UPDATE carts SET quantity = quantity + 1 WHERE id = ?').run(existing.id);
        return { ...existing, quantity: existing.quantity + 1 };
    } else {
        // 新增
        const result = db.prepare(`
      INSERT INTO carts (user_id, product_id, product_name, product_price, product_image, quantity)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(userId, product.id, product.name, product.price, product.image);

        return {
            id: result.lastInsertRowid,
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image: product.image,
            quantity: 1
        };
    }
}

/**
 * 移除購物車項目
 * @param {number} userId
 * @param {number} cartItemId
 */
function removeFromCart(userId, cartItemId) {
    db.prepare('DELETE FROM carts WHERE id = ? AND user_id = ?').run(cartItemId, userId);
}

/**
 * 清空購物車
 * @param {number} userId
 */
function clearCart(userId) {
    db.prepare('DELETE FROM carts WHERE user_id = ?').run(userId);
}

module.exports = {
    db,
    login,
    logout,
    getUserByToken,
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
