import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const fileToModelMap: Record<string, string> = {
    products: "Products",
    expenseSummary: "ExpensesSummary",
    sales: "Sales",
    salesSummary: "SalesSummary",
    purchases: "Purchases",
    purchaseSummary: "PurchaseSummary",
    users: "Users",
    expenses: "Expenses",
    expenseByCategory: "ExpensesByCategory",
};

async function deleteAllData(orderedFileNames: string[]) {
    for (const fileName of orderedFileNames) {
        const baseName = path.basename(fileName, path.extname(fileName));
        const modelName = fileToModelMap[baseName];

        if (modelName) {
            const model: any = prisma[modelName as keyof typeof prisma];
            if (model) {
                await model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            } else {
                console.error(`Model ${modelName} not found in Prisma Client.`);
            }
        } else {
            console.error(`No matching Prisma model for file: ${fileName}`);
        }
    }
}

async function main() {
    const dataDirectory = path.join(__dirname, "seedData");

    const orderedFileNames = [
        "products.json",
        "expenseSummary.json",
        "sales.json",
        "salesSummary.json",
        "purchases.json",
        "purchaseSummary.json",
        "users.json",
        "expenses.json",
        "expenseByCategory.json",
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const baseName = path.basename(fileName, path.extname(fileName));
        const modelName = fileToModelMap[baseName];

        if (modelName) {
            const model: any = prisma[modelName as keyof typeof prisma];
            if (model) {
                for (const data of jsonData) {
                    await model.create({ data });
                }
                console.log(`Seeded ${modelName} with data from ${fileName}`);
            } else {
                console.error(`Model ${modelName} not found in Prisma Client.`);
            }
        } else {
            console.error(`No matching Prisma model for file: ${fileName}`);
        }
    }
}

main().catch( (e) => { console.error("Error during seeding:", e); }).finally(async () => { await prisma.$disconnect(); });
