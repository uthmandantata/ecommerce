# E-commerce Backend API

This is a Node.js and MongoDB backend for an e-commerce platform. It manages users, products, categories, carts, and orders, with admin-specific functionalities.

## Features

- **User Management:** Registration, login, profile updates, and admin creation.
- **Product Management:** CRUD operations on products.
- **Category Management:** CRUD operations on categories.
- **Cart Management:** Add, remove, and clear cart items.
- **Order Management:** Checkout, view orders, admin order management.
- **Admin Dashboard:** Metrics on users, products, orders, revenue, etc.

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Middleware for role-based access (admin/user)

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |
| PUT | `/create-admin/:id` | Create an admin (admin only) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/my-profile` | Get logged-in user profile |
| PUT | `/update-profile/:id` | Update user profile |
| DELETE | `/delete-profile/:id` | Delete your profile |
| DELETE | `/delete-user/:id` | Delete any user (admin only) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/my-cart` | Get user cart |
| POST | `/create-cart` | Add product(s) to cart |
| PUT | `/remove-item-cart` | Remove quantity or product from cart |
| DELETE | `/clear-cart` | Clear entire cart |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all categories |
| POST | `/create-category` | Create a category (admin only) |
| PUT | `/update-category/:id` | Update a category (admin only) |
| DELETE | `/delete-category/:id` | Delete a category (admin only) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/:id` | Get a single product |
| POST | `/create-product` | Create a product (admin only) |
| PUT | `/update-product/:id` | Update a product |
| DELETE | `/delete-product/:id` | Delete a product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all orders (admin only) |
| GET | `/order/:id` | Get a single order (admin only) |
| GET | `/my-orders` | Get logged-in user orders |
| POST | `/checkout` | Checkout cart and create order |

### Admin Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | View dashboard metrics (admin only) |

## License

This project is open-source and free to use.

