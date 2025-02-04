
---

# Inventory Management Dashboard - Seed Data Setup

This project provides a setup for seeding data into your PostgreSQL database using Prisma ORM. The seed data includes the necessary JSON files for populating the database tables.

---

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **Prisma CLI** (Run `npm install` to install required dependencies)
- **PostgreSQL** Database

---

## Steps to Set Up and Seed Data

### 1. Install Dependencies

First, install all required dependencies in your project:

```bash
npm install
```

### 2. Configure Database

Open your .env file and update the `DATABASE_URL` to match your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/Inventory-Management?schema=public"
```

- Replace `<PASSWORD>` with your database password and `Inventory-Management` with your database name.

### 3. Prepare Prisma Schema

Ensure your `schema.prisma` file is set up with the following models:

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

model Products {
    idProduct      String     @id
    name           String
    price          Float
    rating         Float?
    stockQuantity  Int
    Sales          Sales[]
    Purchases      Purchases[]
}

model Sales {
    idSale        String    @id
    idProduct     String
    timestamp     DateTime
    quantity      Int
    unitPrice     Float
    totalAmount   Float
    product       Products  @relation(fields: [idProduct], references: [idProduct])
}

model Purchases {
    idPurchase    String     @id
    idProduct     String
    TimeStamp     DateTime
    Quantity      Int
    unitCost      Float
    TotalCost     Float
    product       Products   @relation(fields: [idProduct], references: [idProduct])
}

model Expenses {
    idExpense     String     @id
    Category      String
    Amount        Float
    TimeStamp     DateTime
}

model SalesSummary {
    idSalesSummary    String    @id
    TotalAmount       Float
    ChangePercentage  Float?
    date              DateTime
}

model PurchaseSummary {
    idPurchaseSummary   String   @id
    TotalPurchased      Float
    ChangePercentage    Float?
    date                DateTime
}

model ExpensesSummary {
    idExpensesSummary   String            @id
    TotalExpenses       Float
    date                DateTime
    ExpenseByCategory   ExpensesByCategory[]
}

model ExpensesByCategory {
    idExpensesByCategory   String            @id
    idExpensesSummary      String
    Category               String
    Amount                 BigInt
    date                   DateTime
    ExpenseSummary         ExpensesSummary   @relation(fields: [idExpensesByCategory], references: [idExpensesSummary])
}
```

### 4. Generate Prisma Client

After ensuring your Prisma schema is set, generate the Prisma client:

```bash
npx prisma generate
```

### 5. Apply Migrations

Run the following command to apply the database schema to your PostgreSQL database:

```bash
npx prisma migrate dev --name init
```

This command will generate the necessary migration files in the `prisma/migrations` folder and apply them to your database.

### 6. Prepare Seed Data

Create a folder named `seedData` inside the `prisma` folder. This folder should contain JSON files for each table that you want to seed. The files should be named as follows:

- products.json
- expenseSummary.json
- sales.json
- salesSummary.json
- purchases.json
- purchaseSummary.json
- users.json
- expenses.json
- expenseByCategory.json

Ensure the JSON files are structured correctly, corresponding to the models defined in `schema.prisma`.

### 7. Add Seed Script to package.json

In your `package.json`, add the following script under the `scripts` section:

```json
"scripts": {
  "seed": "ts-node prisma/seed.ts"
}
```

### 8. Seed the Data

After preparing the seed data and ensuring your files are in place, run the following command to seed your database:

```bash
npm run seed
```

This will:

- Clear existing data in the relevant tables.
- Seed the tables with data from the corresponding JSON files.

### 9. Verify the Seed Data

After the seeding process completes, you can verify the data using one of the following methods:

- **PgAdmin** (for PostgreSQL)
- **TablePlus** or **DBeaver**
- **Prisma Studio**:

```bash
npx prisma studio
```

Prisma Studio will open a web interface that allows you to inspect your seeded data in the database.

---

# Project Backend Installation and Setup

## Overview

This document outlines the steps taken to set up the backend of the project, including the commands run, packages installed, and their purposes. Additionally, it explains the configuration and testing procedures.

---

## Prerequisites

Ensure you have the following installed:
- Node.js (LTS recommended)
- npm (Node Package Manager)
- Postman (for API testing)

---

## Installation Steps

### 1. Install Dependencies

#### Core Dependencies

Run the following command to install the core packages:

```bash
npm i express body-parser cors dotenv morgan
```

**Purpose:**

- `express`: Web framework for Node.js.
- `body-parser`: Middleware to parse incoming request bodies.
- `cors`: Enables Cross-Origin Resource Sharing.
- `dotenv`: Loads environment variables from a `.env` file.
- `morgan`: HTTP request logger.

#### Dev Dependencies

Install the following development dependencies:

```bash
npm install -D concurrently
```

**Purpose:**

- `concurrently`: Allows running multiple commands concurrently during development.

Install additional TypeScript definitions and development tools:

```bash
npm i -D nodemon @types/cors @types/express @types/morgan
```

**Purpose:**

- `nodemon`: Automatically restarts the server on file changes.
- `@types/*`: TypeScript definitions for the respective packages.

#### Additional Utility

Install a utility for cleaning build directories:

```bash
npm i rimraf
```

**Purpose:**

- `rimraf`: A tool for recursively removing files and directories.

---

### 2. Project Configuration

Create an `index.ts` file with the following content:

```typescript

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";

/* Route Imports */

/* Configuration */
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
app.get("/hello", (req, res) => {
    res.send("Hello World2"); 
});

/* Server */
const port = process.env.Port || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

---

### 3. Create New Folders and Files

#### Folder: `src/controllers`

Create a file named `dashboardController.ts` with the following content:

```typescript

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc",
            },
        });

        const salesSumary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });

        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });

        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });

        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });

        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        );

        res.json({
            popularProducts,
            salesSumary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
};

```

#### Folder: `src/routes`

Create a file named `dashboardRoutes.ts` with the following content:

```typescript

import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();

router.get("/", getDashboardMetrics); // http://localhost:8000/dashboard/Metrics

export default router;

```

---

### 4. Update `package.json`

Add the following scripts to your `package.json` file:

```json
"scripts": {
    "build": "rimraf dist && npx tsc",
    "start": "npm run build && node dist/index.js",
    "dev": "npm run build && concurrently \"npx tsc -w\" \"nodemon --exec ts-node src/index.ts\""
}
```

**Purpose:**

- `build`: Cleans the build directory and compiles TypeScript files.
- `start`: Builds the project and starts the server.
- `dev`: Watches for changes and runs the server in development mode with hot reload.

---

### 5. Run the Development Server

Start the development server using the following command:

```bash
npm run dev
```

---

### 6. Test the API

#### Using cURL

Test the `/dashboard` endpoint with:

```bash
curl http://localhost:8000/dashboard
```

Expected Output:

A JSON object containing the dashboard metrics.

#### Using Postman

1. Open the Postman app.
2. Create a new GET request.
3. Set the URL to `http://localhost:8000/dashboard`.
4. Send the request.
5. Verify the response contains the dashboard metrics.

---

## Additional Updates

### Added `/dashboard` Endpoint

- **File Modified:** `index.ts`
- **Description:** Added a route to handle `/dashboard` requests.
- **Code Added:**

```typescript
app.use("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
```

### Created `dashboardController.ts`

- **Folder:** `src/controllers`
- **Purpose:** Contains logic for fetching dashboard metrics.
- **Details:** Implements database queries to retrieve and format metrics such as popular products, sales summaries, and expenses by category.

### Created `dashboardRoutes.ts`

- **Folder:** `src/routes`
- **Purpose:** Defines routes for the `/dashboard` endpoint.
- **Details:** Routes `/dashboard` to the controller function `getDashboardMetrics`.

### Testing with Postman

- Tested `/dashboard` endpoint using Postman.
- Verified correct data retrieval and response structure.

---

## Notes

- Ensure the `Port` environment variable is correctly set in your `.env` file or default to `3001`.
- Use Postman or other tools to test additional endpoints as they are developed.

---

## Conclusion

This README summarizes the backend setup process, including installed dependencies, configurations, and testing methods. The backend is now ready for further development and integration.



