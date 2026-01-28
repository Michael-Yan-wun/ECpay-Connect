# ECPay Connect - 綠界金流整合示範專案(UI版)

Hi Michael! 這是一個整合了 **ECPay (綠界科技)** 全方位金流服務的 Node.js 範例專案。旨在提供一個乾淨、易懂且即插即用的架構，幫助開發者快速上手台灣最普及的金流解決方案。

## 🚀 特色功能

- **快速整合**：基於 `ecpay_aio_nodejs` SDK 封裝。
- **全流程示範**：包含建立訂單、付款轉址到交易結果回傳 (Callback)。
- **環境分離**：支援 `.env` 設定，輕鬆切換測試環境與正式環境。
- **簡單架構**：使用 Express + EJS，邏輯清晰易懂。

## 🛠 系統需求

- **Node.js**: v14.0.0 或更高版本
- **npm / pnpm / yarn**
- **ECPay 商戶帳號**: (測試環境可用官方預設)

## 📦 安裝說明

1. **複製專案**
   ```bash
   git clone https://github.com/Michael-Yan-wun/ECpay-Connect.git
   cd ECpay-Connect
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **配置環境變數**
   複製 `.env.sample` 並重新命名為 `.env`：
   ```bash
   cp .env.sample .env
   ```
   請根據需求修改 `.env` 中的 `MerchantID`、`HashKey` 與 `HashIV`。

## 🏃 啟動專案

- **開發模式 (自動重啟)**:
  ```bash
  npm run dev
  ```
- **正式模式**:
  ```bash
  npm start
  ```

預設啟動於 `http://localhost:3000`。

## 📂 目錄結構

```text
.
├── bin/                # 伺服器啟動腳本
├── data/               # 資料存放處 (SQLite 等)
├── lib/                # 自定義工具函式
├── public/             # 靜態資源 (CSS, JS, Images)
├── routes/             # 路由邏輯 (金流核心邏輯在此)
├── views/              # EJS 模板檔案
├── .env                # 私密環境變數
├── app.js              # 應用程式入口
└── README.md           # 專案說明文件
```

## 🧪 金流測試流程

1. 點擊進入首頁將自動導向綠界測試支付頁面。
2. 使用綠界提供的[測試信用卡卡號](https://developers.ecpay.com.tw/2856/)進行模擬支付。
3. 支付成功後，系統會接收綠界的 `Return_URL` 通知並導向 `Order_Result_URL`。

## 📖 參考資源

- [綠界金流開發文件](https://developers.ecpay.com.tw/?p=2864)
- [ECPay SDK GitHub](https://github.com/ECPay/ECPayAIO_Node.js)

---

**Michael Shop Project** | 致力於最流暢的支付體驗。
