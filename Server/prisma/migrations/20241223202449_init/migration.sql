/*
  Warnings:

  - The primary key for the `Expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Amount` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `Category` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `TimeStamp` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `idExpense` on the `Expenses` table. All the data in the column will be lost.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProduct` on the `Products` table. All the data in the column will be lost.
  - The primary key for the `PurchaseSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ChangePercentage` on the `PurchaseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `TotalPurchased` on the `PurchaseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `idPurchaseSummary` on the `PurchaseSummary` table. All the data in the column will be lost.
  - The primary key for the `Purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Quantity` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `TimeStamp` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `TotalCost` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `idPurchase` on the `Purchases` table. All the data in the column will be lost.
  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProduct` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `idSale` on the `Sales` table. All the data in the column will be lost.
  - The primary key for the `SalesSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ChangePercentage` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `TotalAmount` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `idSalesSummary` on the `SalesSummary` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `ExpensesByCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpensesSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseSummaryId` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPurchased` to the `PurchaseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesSummaryId` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValue` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpensesByCategory" DROP CONSTRAINT "ExpensesByCategory_idExpensesSummary_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_idProduct_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_pkey",
DROP COLUMN "Amount",
DROP COLUMN "Category",
DROP COLUMN "TimeStamp",
DROP COLUMN "idExpense",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "expenseId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenseId");

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "idProduct",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("productId");

-- AlterTable
ALTER TABLE "PurchaseSummary" DROP CONSTRAINT "PurchaseSummary_pkey",
DROP COLUMN "ChangePercentage",
DROP COLUMN "TotalPurchased",
DROP COLUMN "idPurchaseSummary",
ADD COLUMN     "changePercentage" DOUBLE PRECISION,
ADD COLUMN     "purchaseSummaryId" TEXT NOT NULL,
ADD COLUMN     "totalPurchased" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("purchaseSummaryId");

-- AlterTable
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_pkey",
DROP COLUMN "Quantity",
DROP COLUMN "TimeStamp",
DROP COLUMN "TotalCost",
DROP COLUMN "idProduct",
DROP COLUMN "idPurchase",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "purchaseId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchaseId");

-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "idProduct",
DROP COLUMN "idSale",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "saleId" TEXT NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId");

-- AlterTable
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_pkey",
DROP COLUMN "ChangePercentage",
DROP COLUMN "TotalAmount",
DROP COLUMN "idSalesSummary",
ADD COLUMN     "changePercentage" DOUBLE PRECISION,
ADD COLUMN     "salesSummaryId" TEXT NOT NULL,
ADD COLUMN     "totalValue" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("salesSummaryId");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "idUser",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "ExpensesByCategory";

-- DropTable
DROP TABLE "ExpensesSummary";

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "expenseSummaryId" TEXT NOT NULL,
    "totalExpenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("expenseSummaryId")
);

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "expenseByCategoryId" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
