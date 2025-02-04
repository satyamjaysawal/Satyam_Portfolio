
# E-Commerce Project - React + Vite + FastAPI + Neon DB (SQL) + Swagger UI + 

Welcome to the E-Commerce Project repository! This project is designed to be a fully functional e-commerce platform with role-based authentication and a variety of features for customers, vendors, and admins.

## Deployment

The frontend of the project has been deployed and is accessible through the following URL:
[**E-Commerce Website**](https://ecommerce-website-reactjs-vite-frontend.onrender.com)

## Overview

This E-Commerce platform allows users to browse, shop, and manage orders. Vendors can list their products, manage inventory, and handle orders. Admins can manage users, view analytics, and oversee all operations on the platform.

### Key Features:
- User authentication with JWT (JSON Web Tokens)
- Role-based access control (Customer, Vendor, Admin)
- Product listing, shopping cart, and order processing
- Admin dashboard with sales analytics and revenue reports
- Vendor product management and order fulfillment

## Technologies Used

- **Frontend**:
  - React.js
  - TailwindCSS
  - Axios (for API communication)
  - Lucide React (for icons)

- **Backend**:
  - FastAPI (Python)
  - SQLAlchemy (ORM for database interaction)
  - PostgreSQL (database)
  - JWT (for secure authentication)
  - Razorpay (payment gateway)

- **Other**:
  - Docker (for containerization)
  - Python's `pytz` (for timezone management)
  - Git & GitHub (for version control)

## Features

### 1. **User Management**
   - **Sign Up / Login / Logout**: Customers and vendors can sign up, log in, and log out.
   - **Role-based Authentication**: Different roles such as **Customer**, **Vendor**, and **Admin**.
   - **Profile Management**: Users can update their profile details, including email, phone number, and password.

### 2. **Product Management**
   - **Add and Update Products**: Vendors can add new products, update inventory, and manage pricing.
   - **Product Categories and Search**: Customers and vendors can search products by category, rating, or keyword.

### 3. **Shopping Cart & Order Management**
   - **Add Products to Cart**: Customers can add products to their cart and proceed to checkout.
   - **Order Placement**: Customers can place orders and track their shipment status.
   - **Order Processing**: Vendors can review, process, and update the status of orders.

### 4. **Admin Dashboard**
   - **User Management**: Admins can view, update, and delete user profiles.
   - **Sales Analytics**: Admins can generate reports, view monthly revenue trends, and identify the best-performing products.

### 5. **Payment Integration**
   - **Razorpay**: Integrated payment gateway for order payments. Admins can verify payments and handle transaction data.

## Installation

To run this project locally, follow the steps below:

### Backend Setup (FastAPI)
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository-directory
   ```

2. Create a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the environment variables:
   - **DATABASE_URL**: PostgreSQL connection URL
   - **SECRET_KEY**: A secure key for JWT token encoding
   - **RAZORPAY_API_KEY**: API key for Razorpay

   Example `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@localhost/ecommerce_db
   SECRET_KEY=your_secret_key
   RAZORPAY_API_KEY=your_razorpay_api_key
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Database Setup
Ensure you have a PostgreSQL database running. You can use Docker to set up the database easily:
```bash
docker-compose up -d
```

This will start the PostgreSQL container.

### Docker Setup
You can use Docker to run both the frontend and backend services in containers. The project contains a `docker-compose.yml` file to handle both services.

To run the project using Docker:
```bash
docker-compose up --build
```

## Deployment

The frontend of the project has been deployed and is accessible through the following URL:
[**E-Commerce Website**](https://ecommerce-website-reactjs-vite-frontend.onrender.com)

## API Documentation

The API follows a RESTful design and provides endpoints for product management, user authentication, order management, and more.

### **Authentication**
- **POST /auth/register**: Register a new user (Customer or Vendor).
- **POST /auth/login**: Log in and receive a JWT token.
- **POST /auth/logout**: Logout the user and invalidate the token.

### **Product Management**
- **POST /product/products**: Add a new product (Vendor only).
- **GET /product/products**: Get a list of products.
- **GET /product/products/{id}**: Get a specific product by ID.

### **Order Management**
- **POST /orders/place**: Place an order by the customer.
- **GET /orders**: Get all orders for the logged-in user (Customer or Vendor).
- **GET /orders/{id}**: Get a specific order by ID.

### **Admin Operations**
- **GET /admin/products**: View all products (Admin only).
- **GET /admin/users**: View all users (Admin only).

Refer to the [Swagger UI](http://localhost:8000/docs) for full API documentation once the server is running.

## Frontend Guide

The frontend is built using React and Tailwind CSS. The application is divided into sections for customers, vendors, and admins, with role-based authentication and routing.

### Key Components:
- **AuthContext**: Manages user authentication state across the application.
- **UserManualChatbot**: Provides a chatbot-style UI for accessing the user manual.
- **ProductList**: Displays a list of products with filtering and sorting options.
- **OrderHistory**: Allows customers to view their order history.


