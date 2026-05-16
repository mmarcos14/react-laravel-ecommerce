# 🛒 E-Commerce Platform

A full-stack e-commerce web application built with **Laravel** (REST API) and **React.js** (frontend). Customers can browse products, add items to cart, and complete purchases securely.

🌐 **Live Demo:** [shopambroise.shop](https://shopambroise.shop) *(In Development)*
🐙 **Repository:** [github.com/mmarcos14/react-laravel-ecommerce](https://github.com/mmarcos14/react-laravel-ecommerce)

-----

## 🛠️ Tech Stack

|Layer   |Technology                                                    |
|--------|--------------------------------------------------------------|
|Frontend|React.js, React Bootstrap, React Router, Axios, React Toastify|
|Backend |Laravel (PHP), REST API                                       |
|Auth    |Laravel Sanctum (Token-based)                                 |
|Database|MySQL                                                         |
|Hosting |Hostinger                                                     |

-----

## ✨ Features

### 🔐 Authentication & Profile

- User registration and login
- Secure token-based authentication with Laravel Sanctum
- Protected routes for customers and admins
- User profile management

### 🛍️ Customer Side

- Browse and search products by category
- View product details (image, price, description)
- Add products to shopping cart
- Update quantities or remove items from cart
- Checkout process
- Fully responsive design (mobile & desktop)

### ⚙️ Admin Dashboard

- Add, edit, and delete products
- Manage product categories
- Upload product images
- View and manage orders

### 📊 General

- Real-time cart updates
- Clean and intuitive UI

-----

## ⚙️ Installation & Setup

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL

### Backend (Laravel)

```bash
# Clone the repository
git clone https://github.com/mmarcos14/react-laravel-ecommerce.git
cd react-laravel-ecommerce

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure your database in .env
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Start the server
php artisan serve
```

### Frontend (React.js)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

-----

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/    # API Controllers
│   └── Models/              # Eloquent Models
├── routes/
│   └── api.php              # API Routes
├── database/
│   ├── migrations/          # Database Migrations
│   └── seeders/             # Database Seeders
└── frontend/
    ├── src/
    │   ├── components/      # React Components
    │   ├── pages/           # App Pages (Home, Cart, Admin...)
    │   ├── context/         # Cart Context (State Management)
    │   ├── services/        # Axios API Calls
    │   └── router/          # React Router Config
    └── public/
```

-----

## 🔗 API Endpoints

|Method|Endpoint          |Description           |
|------|------------------|----------------------|
|POST  |/api/register     |Register a new user   |
|POST  |/api/login        |User login            |
|GET   |/api/profile      |Get user profile      |
|PUT   |/api/profile      |Update user profile   |
|GET   |/api/products     |Get all products      |
|GET   |/api/products/{id}|Get single product    |
|POST  |/api/products     |Create product (Admin)|
|PUT   |/api/products/{id}|Update product (Admin)|
|DELETE|/api/products/{id}|Delete product (Admin)|
|GET   |/api/cart         |Get cart items        |
|POST  |/api/cart         |Add item to cart      |
|PUT   |/api/cart/{id}    |Update cart item      |
|DELETE|/api/cart/{id}    |Remove item from cart |
|POST  |/api/orders       |Place an order        |
|GET   |/api/orders       |Get all orders (Admin)|

-----

## 🚧 Roadmap

- [ ] Payment integration (Stripe)
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Deploy to production

-----

## 👨‍💻 Author

**Ambroise Zounmenou**

- 🌐 [ambroiseapp.com](https://ambroiseapp.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/ambroise-zounmenou-87843b30b)
- 🐙 [GitHub](https://github.com/mmarcos14)

-----

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
