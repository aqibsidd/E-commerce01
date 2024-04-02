# E-Commerce API using Node.js, Express.js, and MongoDB

This project implements a RESTful API for a simple e-commerce application using Node.js, Express.js, and MongoDB.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) installed and running

### Installation

   Clone the repository:

   ```bash
   https://github.com/aqibsidd/e-commerce-api.git
   cd e-commerce-api

   1. Install the dependencies:
   npm install

   2. Configure MongoDB:
   Create a MongoDB database and get the connection URL.
   Open the config/db.js file and replace 'YOUR_MONGODB_CONNECTION_URL' with your actual MongoDB connection URL.

   Add .env file in which database url localhost and port define
   
   3. Start the server:
   npm start

   The server will start at http://localhost:5500 by default. You can change the port in the app.js or .env file.

   API Endpoints

   User Management:-

   POST /user: Register a new user.
   POST /login: Authenticate user login.
   GET /user?id=userID: Retrieve a single user profile by userID.
   GET /users: Retrieve list of user profile.
   PUT /user?id=userID: Update user profile by userID.
   DELETE /user?id=userID: Delete user profile by userID.

   Product Management:-

   POST /product: Create a new product.
   GET /product?id=productId: Retrieve a single product by productID.
   GET /products: Retrieve a list of products.
   PUT /product?id=productId: Update a product by productId.
   DELETE /product?id=productId: Delete a product by productId.

   Cart Management:-

   POST /cart: Add a product to the user's cart.
   GET /cart?id=cartID: Retrieve a single cart by cartID.
   GET /carts: Retrieve a list of carts.
   PUT /cart?id=cartID: Update a cart by cartID.
   DELETE /cart?id=cartID: Delete a cart by cartId.

   Impliment Products:-
   
  Implement search functionality for products you can search products by query.
  Implement filtering and sorting options for retrievin gproducts you can filter by filterOptions and sort by sortOptions by query.


   Contributors:-
   Aqib Siddiqui
"# e-commerce-api" 
