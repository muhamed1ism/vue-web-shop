# 🛠️ Stolarija Barbarić - Web Shop for Wooden Furniture

Stolarija Barbarić is a web application for selling wooden furniture, built using modern technologies like MySQL, Express.js, Prisma ORM, and Vue.js with Vuetify for the frontend. The application offers role-based access control (user, admin) and supports order management for both customers and administrators.

## 🚀 Starting the Application

### 🔐 .env File

An example `.env` file you need to set up in the backend directory:

```
PORT=4000
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
JWT_SECRET="secret_key"
IMGBB_KEY="imgbb_api_key"
```

### 📜 Running

1. **Fill in the `.env` file** with the required environment variables.
2. **Install the necessary modules** for both backend and frontend using `npm install`.
3. **Run the MySQL database** using Docker.
4. **Migrate the databases** (only the first time) using Prisma.
5. **Start the backend and frontend servers** using `npm run dev`.

### ⚙️ Backend server:

1. In the backend directory, install the necessary modules:
   ```bash
   cd backend
   npm install
   ```

2. Start the MySQL database using Docker:
   ```bash
   docker-compose up --build
   ```

   For subsequent runs, use:
   ```bash
   docker-compose up
   ```

3. **Migrate Prisma models** (run only the first time when the database is empty):
   ```bash
   npx prisma migrate dev
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 🎨 Frontend server:

1. Navigate to the frontend directory and install the modules:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend server:
   ```bash
   npm run dev
   ```

## ✨ Features

- **Guest users**: Can browse products and add them to the cart, but need to sign in to complete purchases.
- **Authenticated users**: Can manage their cart, place orders, and view order history.
- **Administrators**: Can manage products (add, edit, delete) and review and process all orders. Orders can be accepted or declined.
- **Role-based authentication**: Supports different user roles (user, admin) using JWT tokens.

## 🧰 Technologies

### Backend:
- **Node.js** and **Express.js**: Backend framework for developing REST APIs.
- **MySQL**: Relational database, running via **Docker-compose**.
- **Prisma ORM**: Database management and migrations.
- **JWT (jsonwebtoken)**: For token-based authentication and authorization.
- **Bcrypt**: Hashing user passwords.
- **Multer and Axios**: For uploading images to **ImgBB**.
- **Cors**: Resolving CORS issues in frontend-backend communication.
- **Dotenv**: Loading environment variables from `.env` file.
- **Nodemon**: Automatically restarting the server during development.

### Frontend:
- **Vue 3** and **Vuetify 3**: Advanced UI framework for building responsive user interfaces.
- **Vite**: Build tool for faster compilation of Vue applications.
- **Pinia**: Application state management.
- **VueUse**: Using `useLocalStorage` to store tokens, user roles, and authentication data.

## 🗂️ Models

The application uses the following models:

- **User**: User data (name, email, role, password).
- **Product**: Product information (name, description, price, stock, image URL).
- **Order**: User orders, linked to the user and order status.
- **OrderItem**: Items in orders, containing information about the products in each order.
- **RevokedToken**: Records of revoked JWT tokens.
- **Role (enum)**: User roles (USER, ADMIN).
- **OrderStatus (enum)**: Order statuses (PENDING, COMPLETED, CANCELLED).

## 🛒 Application Features

- Users can browse products, add them to the cart, and place orders.
- Admin users can manage product inventory, add new items, and manage orders.
- The application is responsive and adjusts to all screen sizes.
- Dark and light theme switching is enabled.