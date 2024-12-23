-- DropForeignKey
ALTER TABLE "ExpensesByCategory" DROP CONSTRAINT "ExpensesByCategory_idExpensesByCategory_fkey";

-- AlterTable
ALTER TABLE "ExpensesByCategory" ALTER COLUMN "Amount" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "ExpensesByCategory" ADD CONSTRAINT "ExpensesByCategory_idExpensesSummary_fkey" FOREIGN KEY ("idExpensesSummary") REFERENCES "ExpensesSummary"("idExpensesSummary") ON DELETE RESTRICT ON UPDATE CASCADE;
