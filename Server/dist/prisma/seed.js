"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const fileToModelMap = {
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
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const fileName of orderedFileNames) {
            const baseName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const modelName = fileToModelMap[baseName];
            if (modelName) {
                const model = prisma[modelName];
                if (model) {
                    yield model.deleteMany({});
                    console.log(`Cleared data from ${modelName}`);
                }
                else {
                    console.error(`Model ${modelName} not found in Prisma Client.`);
                }
            }
            else {
                console.error(`No matching Prisma model for file: ${fileName}`);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
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
        yield deleteAllData(orderedFileNames);
        for (const fileName of orderedFileNames) {
            const filePath = path_1.default.join(dataDirectory, fileName);
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            const baseName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const modelName = fileToModelMap[baseName];
            if (modelName) {
                const model = prisma[modelName];
                if (model) {
                    for (const data of jsonData) {
                        yield model.create({ data });
                    }
                    console.log(`Seeded ${modelName} with data from ${fileName}`);
                }
                else {
                    console.error(`Model ${modelName} not found in Prisma Client.`);
                }
            }
            else {
                console.error(`No matching Prisma model for file: ${fileName}`);
            }
        }
    });
}
main().catch((e) => { console.error("Error during seeding:", e); }).finally(() => __awaiter(void 0, void 0, void 0, function* () { yield prisma.$disconnect(); }));
