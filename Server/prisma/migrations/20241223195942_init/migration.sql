/*
  Warnings:

  - You are about to drop the `ExpenseByCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_idExpenseByCategory_fkey";

-- DropTable
DROP TABLE "ExpenseByCategory";

-- DropTable
DROP TABLE "ExpenseSummary";

-- DropTable
DROP TABLE "SaleSummary";

-- CreateTable
CREATE TABLE "SalesSummary" (
    "idSalesSummary" TEXT NOT NULL,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "ChangePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("idSalesSummary")
);

-- CreateTable
CREATE TABLE "ExpensesSummary" (
    "idExpensesSummary" TEXT NOT NULL,
    "TotalExpenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpensesSummary_pkey" PRIMARY KEY ("idExpensesSummary")
);

-- CreateTable
CREATE TABLE "ExpensesByCategory" (
    "idExpensesByCategory" TEXT NOT NULL,
    "idExpensesSummary" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpensesByCategory_pkey" PRIMARY KEY ("idExpensesByCategory")
);

-- AddForeignKey
ALTER TABLE "ExpensesByCategory" ADD CONSTRAINT "ExpensesByCategory_idExpensesByCategory_fkey" FOREIGN KEY ("idExpensesByCategory") REFERENCES "ExpensesSummary"("idExpensesSummary") ON DELETE RESTRICT ON UPDATE CASCADE;
