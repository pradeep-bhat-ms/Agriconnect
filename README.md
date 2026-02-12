<h1 align="center">🌾 AgriConnect – Digitally Transforming Agriculture 🌱</h1>

<p align="center">
  <img src="https://github.com/pradeep-bhat-ms/Agriconnect/blob/main/Gemini_Generated_Image_5rk4ux5rk4ux5rk4.png?raw=true" width="500" alt="AgriConnect Logo">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green" />
  <img src="https://img.shields.io/badge/API-Express-black" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

## 🌱 About The Project

**AgriConnect** is a full-stack agricultural web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

It digitally connects:

- 👨‍🌾 Farmers  
- 🧑‍💼 Sellers  
- 👨‍👩‍👧 Consumers  

The platform enables seamless product management, online sales, equipment renting, secure digital payments, and agricultural service integration.

---

## 🚀 Key Features

### 👨‍🌾 Farmer Module
- Manage farmer profile
- Add, update, and delete grain listings
- Edit address and personal details
- Buy seeds and pesticides
- Rent agricultural machinery
- Apply for agricultural loans & credit services

### 🧑‍💼 Seller Module
- Seller profile management
- Add/Delete products
- Update stock & pricing
- Manage company information

### 👨‍👩‍👧 Consumer Module
- Profile & address management
- Browse and purchase products
- Add to cart / remove / update quantity
- Secure checkout via **PayPal Payment Gateway**

### 💬 Additional Features
- 🤖 Integrated ChatBot
- 🔐 Secure Authentication using JWT
- 🌐 Fully Responsive UI with React
- ⚡ RESTful API using Express & Node.js
- 📦 MongoDB database integration

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Backend | Node.js |
| API | Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Payments | PayPal |

---

## 📂 Project Structure

```
Agriconnect/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│
├── frontend/
│   ├── components/
│   ├── screens/
│   ├── redux/
│
├── .env
├── package.json
└── README.md
```

---

## 🔐 Environment Variables Setup

Create a `.env` file in the root directory:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Create another `.env` file inside the frontend folder:

```
REACT_APP_GOOGLE_KEY=your_google_map_api_key
```

---

## 🧰 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/pradeep-bhat-ms/Agriconnect.git
cd Agriconnect
```

### 2️⃣ Install Dependencies

```bash
npm install
cd frontend
npm install
```

### 3️⃣ Run Application

```bash
npm run dev
```

Run backend only:

```bash
npm run server
```

---

## 🏗️ Build for Production

```bash
cd frontend
npm run build
```

---

## 🌾 Database Seeding (Optional)

```bash
npm run data:import
npm run data:destroy
```

---

## 🌐 Live Demo

Coming Soon...

---

## 🌟 Future Enhancements

- 📊 AI-Based Crop Recommendation
- 🌦 Weather API Integration
- 📱 Mobile Application Version
- 📦 Order Tracking System
- 📄 Invoice & PDF Export
- 📩 SMS / Email Notification System

---

## 🪪 Credits

This project is inspired by an open-source MERN e-commerce foundation originally developed by **Sanjula De Alwis (MIT Licensed)**.

AgriConnect extends and customizes the base architecture into a university-level agricultural digital ecosystem with:

- Multi-role architecture (Farmer, Seller, Consumer)
- ChatBot integration
- PayPal payment gateway
- Enhanced UX/UI customization

---

## 👨‍💻 Author

**Pradeep Bhat M S**  
MCA (AI & ML) – 2025  
Full Stack Developer | Agriculture Tech Enthusiast  

GitHub: https://github.com/pradeep-bhat-ms  

---

## ⚖️ License

This project is licensed under the MIT License.  
See the LICENSE file for details.
