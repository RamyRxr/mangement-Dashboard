-- CreateTable
CREATE TABLE "Users" (
    "idUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Products" (
    "idProduct" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "stockQuantity" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("idProduct")
);

-- CreateTable
CREATE TABLE "Sales" (
    "idSale" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("idSale")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "idPurchase" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "TimeStamp" TIMESTAMP(3) NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "TotalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("idPurchase")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "idExpense" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TimeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("idExpense")
);

-- CreateTable
CREATE TABLE "SaleSummary" (
    "idSaleSummary" TEXT NOT NULL,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "ChangePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleSummary_pkey" PRIMARY KEY ("idSaleSummary")
);

-- CreateTable
CREATE TABLE "PurchaseSummary" (
    "idPurchaseSummary" TEXT NOT NULL,
    "TotalPurchased" DOUBLE PRECISION NOT NULL,
    "ChangePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("idPurchaseSummary")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "idExpenseSummary" TEXT NOT NULL,
    "TotalExpenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("idExpenseSummary")
);

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "idExpenseByCategory" TEXT NOT NULL,
    "idExpensesSummary" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("idExpenseByCategory")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_idExpenseByCategory_fkey" FOREIGN KEY ("idExpenseByCategory") REFERENCES "ExpenseSummary"("idExpenseSummary") ON DELETE RESTRICT ON UPDATE CASCADE;
