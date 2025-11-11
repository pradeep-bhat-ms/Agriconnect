<h1 align="center">🌾 AgriConnect – Reforming Agri Living 🌱</h1>  

<p align="center">
  <img src="https://user-images.githubusercontent.com/49508237/104348350-a5485a80-5527-11eb-854b-b2477bfeb96d.png" width="500" alt="AgriConnect Logo">
</p>

---

## 🌱 Agricultural Web Application for University Project  
Built with **React.js + Express.js + Node.js + MongoDB (MERN)** 💻  

**AgriConnect** is a full-stack web application designed to **digitally transform agricultural living**.  
It connects **Farmers, Sellers, and Consumers** — simplifying product management, online sales, renting agricultural equipment, and secure digital payments.

---

## 🚀 Features

### 👨‍🌾 Farmer
- Create & manage personal profile  
- Add/Delete grains  
- Edit profile and address  
- Buy seeds/pesticides or rent machines  
- Apply for agricultural loans and credit cards  

### 🧑‍💼 Seller
- Create and manage Seller Profile  
- Add/Delete products  
- Edit personal & company details  
- Manage stock and pricing  

### 👨‍👩‍👧 Consumer
- Create profile & manage address  
- Purchase directly from Farmers  
- Manage shopping cart (add, remove, change quantity)  
- Pay securely via **PayPal Gateway**  

### 💬 Additional Features
- 🤖 Integrated **ChatBot** for real-time support  
- 🔐 Secure Authentication using **JWT**  
- 🌐 Responsive Frontend with **React.js**  
- ⚡ RESTful Backend with **Express.js** and **MongoDB**  

---

## ⚙️ Usage

### 🧩 ES Modules in Node
This project uses **ECMAScript Modules (ESM)** in the backend.  
Ensure your Node version is **v14.6+** or higher.  

If not, use:

When importing files, always include the `.js` extension.  
You can also use **Babel** for compatibility.

---

## 🔐 Environment Variables

Create a `.env` file in the **root** directory and add:

NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_secret_key
PAYPAL_CLIENT_ID = your_paypal_client_id

Then create another `.env` file inside the **frontend** folder and add:


---
REACT_APP_GOOGLE_KEY = your_google_map_api_key


---

## 🧰 Installation & Setup

### 1️⃣ Install dependencies
```bash
npm install
cd frontend
npm install

2️⃣ Run Application
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

🏗️ Build & Deploy
# Create frontend production build
cd frontend
npm run build

🌾 Database Seeding (Optional)

To seed or clear sample data:

# Import sample data
npm run data:import

# Destroy all data
npm run data:destroy
🪪 Credits

This project is based on the original open-source project by
Sanjula De Alwis

Customized and extended as AgriConnect for:
University-level Agricultural Web Application
Enhanced profile management (Farmer, Seller, Consumer)
Integrated ChatBot
PayPal payment gateway
Simplified UX/UI for academic demonstration
⚖️ License

This project is licensed under the MIT License.

MIT License  

Copyright (c) 2020 Sanjula De Alwis  

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

🌻 Acknowledgement

Special thanks to Sanjula De Alwis for the open-source foundation
and to the open-source community for continuous inspiration and learning.


---

### ✅ What to Do Now

1. Save this as `README.md` inside your **AgriConnect** project folder.  
2. Keep the existing `LICENSE` file (don’t delete or edit it).  
3. Push to GitHub:
   ```bash
   git add README.md
   git commit -m "Added AgriConnect README with proper credits"
   git push origin main


