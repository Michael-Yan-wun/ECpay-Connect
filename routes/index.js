/**
 * 主路由 - 頁面渲染 & 綠界金流
 */
const express = require('express');
const router = express.Router();
require('dotenv').config();

// 綠界 SDK
const ecpay_payment = require('ecpay_aio_nodejs');

// 資料
const products = require('../data/products');

// 綠界設定
const { MERCHANTID, HASHKEY, HASHIV, HOST, OPERATION_MODE } = process.env;
const options = {
  OperationMode: OPERATION_MODE || 'Test',
  MercProfile: {
    MerchantID: MERCHANTID || '2000132',
    HashKey: HASHKEY || '5294y06JbISpM5x9',
    HashIV: HASHIV || 'v77hoKGq4kWxNNIS',
  },
  IgnorePayment: [],
  IsProjectContractor: false,
};

// ==================== 頁面路由 ====================

// 首頁
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Michael Shop',
    products: products
  });
});

// 結帳頁面 - 整合綠界金流
router.post('/checkout', (req, res) => {
  try {
    const cartData = JSON.parse(req.body.cartData || '{}');
    const { items = [], total = 0 } = cartData;

    if (items.length === 0) {
      return res.redirect('/');
    }

    // 生成訂單編號
    const TradeNo = 'SN' + Date.now();

    // 商品名稱
    const itemNames = items.map(item => `${item.name} x${item.quantity}`).join('#');

    // 綠界參數
    const merchantID = MERCHANTID || '2000132';
    const hashKey = HASHKEY || '5294y06JbISpM5x9';
    const hashIV = HASHIV || 'v77hoKGq4kWxNNIS';
    const host = HOST || 'http://localhost:3000';

    const sdkOptions = {
      OperationMode: OPERATION_MODE || 'Test',
      MercProfile: {
        MerchantID: merchantID,
        HashKey: hashKey,
        HashIV: hashIV,
      },
      IgnorePayment: options.IgnorePayment,
      IsProjectContractor: false,
    };

    const create = new ecpay_payment(sdkOptions);

    // 格式化日期：yyyy/MM/dd HH:mm:ss
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const tradeDate = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const params = {
      MerchantTradeNo: TradeNo,
      MerchantTradeDate: tradeDate,
      TotalAmount: total.toString(),
      TradeDesc: 'Michael Shop 購物',
      ItemName: itemNames,
      ReturnURL: `${host}/return`,
      ClientBackURL: `${host}/client-return`,
      ChoosePayment: 'ALL',
    };

    // SDK 回傳的是完整的 HTML form 字串（含自動提交 script）
    let ecpayFormHtml = create.payment_client.aio_check_out_all(params);

    // 移除自動提交的 script，讓使用者手動點擊確認
    ecpayFormHtml = ecpayFormHtml.replace(/<script[^>]*>.*?<\/script>/gi, '');

    console.log('訂單編號:', TradeNo);

    const ecpayUrl = OPERATION_MODE === 'Production'
      ? 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5'
      : 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';

    res.render('checkout', {
      orderItems: items,
      totalAmount: total,
      ecpayFormHtml: ecpayFormHtml,
      ecpayUrl: ecpayUrl
    });

  } catch (error) {
    console.error('結帳錯誤:', error);
    res.redirect('/');
  }
});

// 綠界回傳
router.post('/return', async (req, res) => {
  console.log('綠界回傳資料:', req.body);

  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue;

  // 這裡可以驗證 CheckMacValue
  // 並更新訂單狀態

  res.send('1|OK');
});

// 用戶返回頁面
router.get('/client-return', (req, res) => {
  console.log('用戶返回:', req.query);
  res.render('return', { query: req.query });
});

module.exports = router;
