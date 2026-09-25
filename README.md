# 🟢 Inventory Management System — Backend

The backend REST API for a full-stack **Inventory Management System**, built using **Node.js, Express, TypeScript, MongoDB and Mongoose**.

This project was completed as a learning project to practice backend development, REST APIs, authentication, database operations and connecting a backend to a React frontend.

---

## 📦 About the Backend

This backend provides the server-side functionality for an Inventory Management System.

It handles:

- 🔐 User authentication
- 👤 User accounts
- 📦 Products
- 🏷️ Categories
- 🏷️ Brands
- 👥 Sellers
- 🛒 Purchases
- 💰 Sales
- 📥 Stock management
- 📊 Sales reports
- 💵 Revenue data

The API communicates with **MongoDB** using **Mongoose** and provides REST API endpoints that can be consumed by the separate React frontend.

---

# 🚀 Features

- 🔐 User registration and login
- 🎟️ JWT authentication
- 🔑 Password hashing
- 🛡️ Authentication middleware
- 👤 Retrieve authenticated user information
- 📦 Product CRUD operations
- 📥 Add product stock
- 🏷️ Category management
- 🏷️ Brand management
- 👥 Seller management
- 🛒 Purchase management
- 💰 Sales management
- 📊 Daily sales reports
- 📊 Weekly sales reports
- 📊 Monthly sales reports
- 📊 Yearly sales reports
- 💵 Revenue calculations
- 🔎 Database queries
- ✅ Request validation
- ❌ API error handling

---

# 🧠 What I Practiced

## 🟢 Backend Development

I practiced:

- 🟢 Building a backend with **Node.js**
- 🚂 Creating REST APIs with **Express**
- 🔷 Using **TypeScript** on the backend
- 🛣️ Creating and organising API routes
- 🎮 Working with controllers
- ⚙️ Separating application logic into services
- 📦 Implementing CRUD operations
- 📤 Handling requests and responses
- 🔢 Working with HTTP status codes
- ❌ Handling backend errors
- 🐛 Debugging API and TypeScript problems

---

## 🍃 MongoDB & Mongoose

I practiced:

- 🍃 Using **MongoDB** as the database
- 🔗 Connecting to MongoDB with **Mongoose**
- 🗃️ Creating schemas and models
- 📄 Working with MongoDB documents
- ➕ Creating database records
- 🔍 Querying records
- ✏️ Updating records
- 🗑️ Deleting records
- 📦 Managing product inventory
- 📥 Updating product stock
- 💰 Storing sales and purchases
- 📊 Retrieving data for reports

---

## 🔐 Authentication & Security

I practiced:

- 👤 Registering users
- 🔐 Logging users in
- 🔑 Hashing passwords with **bcrypt**
- 🎟️ Creating and verifying **JSON Web Tokens (JWT)**
- 🛡️ Protecting API endpoints with authentication middleware
- 👤 Identifying the currently authenticated user
- ❌ Handling unauthorised requests
- ✅ Validating request data with **Zod**

---

## 🌐 REST API Development

I practiced working with REST API operations such as:

```text
GET     → Retrieve data
POST    → Create data
PATCH   → Update data
DELETE  → Delete data
```

I also practiced:

- 🛣️ Designing API routes
- 📥 Reading request bodies
- 🔎 Reading route parameters
- 📤 Returning JSON responses
- 🔢 Returning appropriate HTTP status codes
- 🔐 Protecting routes
- ❌ Returning API errors
- 🔗 Connecting API endpoints to database operations

---

## 📊 Inventory & Reporting

I practiced backend logic for:

- 📦 Creating and managing products
- 📥 Adding stock
- 🏷️ Managing categories and brands
- 👥 Managing sellers
- 🛒 Recording purchases
- 💰 Recording sales
- 📉 Updating stock after sales
- 📅 Retrieving daily sales information
- 📅 Retrieving weekly sales information
- 📅 Retrieving monthly sales information
- 📅 Retrieving yearly sales information
- 💵 Calculating revenue information

---

## 🐛 Debugging

Debugging was an important part of working on the backend.

I practiced:

- 🔎 Reading TypeScript compiler errors
- 🚂 Debugging Express routes
- 🎮 Debugging controllers
- ⚙️ Debugging service logic
- 🍃 Debugging MongoDB and Mongoose issues
- 🌐 Testing API endpoints
- 🔐 Debugging authentication
- 📦 Fixing package and import problems
- 🧭 Tracing requests through different backend files
- 🧪 Testing CRUD operations
- 🧠 Reading and understanding an existing backend codebase
- 🛠️ Modifying existing functionality

---

# 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-REST_API-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

- 🟢 Node.js
- 🚂 Express
- 🔷 TypeScript
- 🍃 MongoDB
- 🔗 Mongoose
- ✅ Zod
- 🎟️ JSON Web Tokens (JWT)
- 🔑 bcrypt

---

# 🔄 Backend Architecture

The backend separates routes, controllers, services and database models.

The general request flow is:

```text
Frontend
    ↓
REST API Request
    ↓
Express Route
    ↓
Controller
    ↓
Service
    ↓
Mongoose Model
    ↓
MongoDB
```

The result is then returned through the API:

```text
MongoDB
    ↓
Mongoose
    ↓
Service
    ↓
Controller
    ↓
JSON Response
    ↓
Frontend
```

This structure helped me understand how different parts of a backend application can have separate responsibilities.

---

# 📂 Backend Structure

```text
inventory-management-system-backend/
│
├── src/
│   ├── modules/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── LICENSE
└── README.md
```

---

# ⚙️ Running the Backend

## 1️⃣ Clone the Repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

Enter the project:

```bash
cd inventory-management-system-backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

This installs the required dependencies into `node_modules`.

> `node_modules` should not be committed to GitHub.

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit your real `.env` file to GitHub.

Make sure `.env` and `node_modules` are included in `.gitignore`.

---

## 4️⃣ Start MongoDB

Make sure your MongoDB database is running before starting the API.

For a local MongoDB database, the connection can use a URL similar to:

```text
mongodb://127.0.0.1:27017/inventory_management
```

---

## 5️⃣ Start the Development Server

```bash
npm run dev
```

The backend will normally run on:

```text
http://localhost:8000
```

The API base URL is:

```text
http://localhost:8000/api/v1
```

---

# 🔗 Frontend

This backend is part of a full-stack Inventory Management System.

The React frontend is maintained in a separate repository:

**Frontend Repository:** `ADD_YOUR_FRONTEND_REPOSITORY_LINK_HERE`

The frontend uses:

- ⚛️ React
- 🔷 TypeScript
- ⚡ Vite
- 🔄 Redux Toolkit
- 🌐 RTK Query
- 🎨 Ant Design
- 📊 Recharts

---

# 🔗 Using the Frontend and Backend Together

This Inventory Management System is split into two repositories:

- ⚛️ **Frontend** — React, TypeScript, Redux Toolkit and RTK Query
- 🟢 **Backend** — Node.js, Express, TypeScript and MongoDB

To run the complete full-stack application, both repositories are required.

## 1️⃣ Create a Project Folder

Create a folder for the complete application:

```bash
mkdir inventory-management-system
cd inventory-management-system
```

## 2️⃣ Clone the Frontend

Clone the frontend repository into a folder called `frontend`:

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL frontend
```

## 3️⃣ Clone the Backend

Clone the backend repository into a folder called `backend`:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL backend
```

Your project should now look like:

```text
inventory-management-system/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── backend/
    ├── src/
    ├── package.json
    └── ...
```

## 4️⃣ Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

## 5️⃣ Configure Environment Variables

Create the required `.env` files for both the frontend and backend.

### Frontend `.env`

```env
VITE_BASE_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Backend `.env`

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Environment files are not included in the repositories because they may contain private credentials.

## 6️⃣ Run the Application

Make sure MongoDB is running.

Open one terminal for the backend:

```bash
cd backend
npm run dev
```

Then open another terminal for the frontend:

```bash
cd frontend
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

The backend API will normally run at:

```text
http://localhost:8000/api/v1
```

## 🔗 How the Frontend and Backend Communicate

The frontend and backend are stored in separate repositories, but they work together as one full-stack application.

The **React frontend** communicates with the **Express backend** by sending HTTP requests to the REST API using **RTK Query**.

```text
⚛️ React Frontend
localhost:5173
       │
       │ HTTP Request
       ▼
🌐 Express REST API
localhost:8000/api/v1
       │
       ▼
🛣️ Express Route
       │
       ▼
🎮 Controller
       │
       ▼
⚙️ Service
       │
       ▼
🔗 Mongoose
       │
       ▼
🍃 MongoDB
```

For example, when the user views the products page:

```text
React Component
      ↓
RTK Query
      ↓
GET /api/v1/products
      ↓
Express Backend
      ↓
MongoDB
      ↓
JSON Response
      ↓
RTK Query
      ↓
React displays the products
```

The frontend uses an environment variable to specify the location of the backend API:

```env
VITE_BASE_URL=http://localhost:8000/api/v1
```

This allows the frontend and backend to remain as separate applications and repositories while still communicating through the REST API.

Actions such as **creating products, adding stock, recording sales, updating products and deleting records** are sent from the frontend to the backend. The backend processes the request, communicates with MongoDB and returns a response to the frontend.

Both applications need to be running for the complete Inventory Management System to work.

# 👨‍💻 Author

**Shaurya Parmar**

Web Development Student

Interested in **frontend, backend and full-stack web development**.
