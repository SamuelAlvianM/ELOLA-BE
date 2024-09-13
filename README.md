# SaleMate - RESTful API for Inventory Management and Point of Sales (POS)

Welcome to SaleMate, a RESTful API designed to empower local businesses by providing comprehensive Inventory Management and Point of Sales (POS) solutions. Our mission is to support local businesses in growing and managing their assets with ease, while also enhancing their online presence, automating marketing efforts, and offering customer relationship management (CRM) tools tailored specifically to their needs.

## Overview 
SaleMate is more than just an inventory management system. It's a comprehensive solution tailored specifically for local businesses, focusing on:
- Inventory Management: Easily track, manage, and update your inventory in real-time.
- Point of Sales (POS): Streamline sales transactions, making it simple to manage orders, payments, and customer interactions.
- Online Presence: Boost your business’s visibility with features that help you establish and manage an online presence.
- Marketing Automation: Automate marketing tasks to reach more customers and grow your business effortlessly.
- Customer Relationship Management (CRM): Build and maintain strong relationships with your customers, tailored to their needs.

## Technologies Used:
1. Node.js with Nest.js Framework: Server-side JavaScript runtime.
2. Express.js: Web framework for building RESTful APIs.
3. Prisma: ORM for managing database operations.
4. PostgreSQL: Relational database for data storage.
5. JWT: JSON Web Tokens for authentication.
6. Docker: Containerization for easy deployment.
7. API Documentation: Swagger

## Folder Structure
 ```
 |-- SaleMate-BE/
 |   ├── prisma/                   # Prisma ORM Configuration & Migrations scripts for managing the database.
 |   ├── src/                      # Source Code Directory
 |       └── assets                # Documentation files (e.g., screenshot images)
 |       └── authentication/       # components & services related to user authentication & authorization mechanisms.
 |       └── driver_partner/       # Components related to manages functionalities and logic related to driver partners.
 |       └── inventory/            # Components related for managing inventory features.
 |       └── open_close/           # Components related to handles functionalities related to when stores are operational.
 |       └── payment/              # Components related to managing payment processing.
 |       └── prisma/               # Prisma ORM configurations specific to src.
 |       └── product/              # Components related to Product pages.
 |       └── product_category/     # Components related to Product Category.
 |       └── promo/                # Components and functionalities related to manages promotional offers.
 |       └── store/                # Components related to managing stores details.
 |       └── supplier/             # Components related to manages supplier-related functionalities.
 |       └── tax/                  # Components related to Handles tax-related functionalities (calculate tax, etc).
 |       └── transaction/          # Components related to manages transactions within the system.
 |       └── user/                 # Components related for managing users (User Profile).
 |       └── utils/                # Houses utility functions and helper methods used throughout the application.
 |       └── app.controller.ts     # Controller logic for handling HTTP requests
 |       └── app.module.ts         # NestJS module where components are imported
 |       └── app.service.ts        # Service layer for business logic
 |       └── main.ts               # Bootstrap file, entry point of the application
 |       └── tests/                # Contains test files to ensure that the application components work correctly.
 |-- README.md                     # Readme file containing project documentation
 |-- example.env                   # Example environment variables file
```

## Installation
1. Clone the repository
```bash
git clone https://github.com/SamuelAlvianM/SaleMate-BE.git
```
2. Install Project Dependencies
```bash
$ npm install
```

3. Set up Prisma

    a. Install the Prisma CLI as a development dependency:
```bash
$ npm install -D prisma
```

 b. Initialize Prisma inside your Project:
```bash
$ npx prisma init
```

4. Set up the Database: configure your database setting in the `.env` file

    a. Localhost:
```bash
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
```

b. Deployment Link:
```bash
DATABASE_URL="postgresql://postgres:pkYBhndFhQhiKNXwqgDtkmiweJUNMUiL@viaduct.proxy.rlwy.net:27020/railway"
JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
```

5. Prisma Schema
 - Migrate the database
```bash
$ npx prisma migrate dev --name init
```
 - Generate the database
 ```bash
 $ npx prisma generate
 ```


## Usage/Examples

### Running the App:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation
<h2 align="center"> PostgreSQL ERD</h2><img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/SaleMate%20ERD.jpg?raw=true">

<h2 align="center"> Railway Production</h2><img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/Railway%20Production.jpg?raw=true">

<h2 align="center"> Swagger API Documentation</h2><img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/API%20Documentation.png?raw=true">

## API Documentation Reference : [SaleMate API Collection](http://localhost:3000/api)

## Deployment Link
### Backend Deployment Link:
To deploy this project run:

```bash
  http://salemate-be-production.up.railway.app
```

### Frontend Deployment Link:
```bash
   [https://sale-mate-fe.vercel.app/login](https://sale-mate-fe.vercel.app/)
```
