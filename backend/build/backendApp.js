"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const auth_dependencies_1 = __importDefault(require("./modules/auth/infrastructure/auth-dependencies"));
const user_dependencies_1 = __importDefault(require("./modules/user/infrastructure/user-dependencies"));
const company_dependencies_1 = __importDefault(require("./modules/company/infrastructure/company-dependencies"));
const customer_dependencies_1 = __importDefault(require("./modules/customer/infrastructure/customer-dependencies"));
const employee_dependencies_1 = __importDefault(require("./modules/employee/infrastructure/employee-dependencies"));
const user_role_dependencies_1 = __importDefault(require("./modules/user-role/infrastructure/user-role-dependencies"));
const item_dependencies_1 = __importDefault(require("./modules/item/infrastructure/item-dependencies"));
const sale_dependencies_1 = __importDefault(require("./modules/sale/infrastructure/sale-dependencies"));
const inventory_dependencies_1 = __importDefault(require("./modules/inventory/infrastructure/inventory-dependencies"));
const order_dependencies_1 = __importDefault(require("./modules/order/infrastructure/order-dependencies"));
const company_dependencies_2 = __importDefault(require("./modules/company/infrastructure/company-dependencies"));
const discount_dependencies_1 = __importDefault(require("./modules/discount/infrastructure/discount-dependencies"));
const tax_dependencies_1 = __importDefault(require("./modules/tax/infrastructure/tax-dependencies"));
const provider_dependencies_1 = __importDefault(require("./modules/provider/infrastructure/provider-dependencies"));
const menu_dependencies_1 = __importDefault(require("./modules/menu/infrastructure/menu-dependencies"));
const contact_dependencies_1 = __importDefault(require("./modules/contact/infrastructure/contact-dependencies"));
const job_dependencies_1 = __importDefault(require("./modules/job/infrastructure/job-dependencies"));
const order_item_dependencies_1 = __importDefault(require("./modules/order-item/infrastructure/order-item-dependencies"));
const category_dependencies_1 = __importDefault(require("./modules/category/infrastructure/category-dependencies"));
const item_modifier_dependencies_1 = __importDefault(require("./modules/modifier/infrastructure/item-modifier-dependencies"));
const item_variant_dependencies_1 = __importDefault(require("./modules/variant/infrastructure/item-variant-dependencies"));
exports.default = new server_1.Server({
    routes: [
        user_dependencies_1.default.router,
        auth_dependencies_1.default.router,
        company_dependencies_1.default.router,
        employee_dependencies_1.default.router,
        customer_dependencies_1.default.router,
        user_role_dependencies_1.default.router,
        sale_dependencies_1.default.router,
        inventory_dependencies_1.default.router,
        item_dependencies_1.default.router,
        category_dependencies_1.default.router,
        item_variant_dependencies_1.default.router,
        item_modifier_dependencies_1.default.router,
        menu_dependencies_1.default.router,
        order_dependencies_1.default.router,
        company_dependencies_2.default.router,
        discount_dependencies_1.default.router,
        tax_dependencies_1.default.router,
        provider_dependencies_1.default.router,
        contact_dependencies_1.default.router,
        job_dependencies_1.default.router,
        order_item_dependencies_1.default.router,
    ],
    middlewares: [],
});
