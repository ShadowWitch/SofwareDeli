import { Server } from "./server";
import authModule from "./modules/auth/infrastructure/auth-dependencies";
import userModule from "./modules/user/infrastructure/user-dependencies";
import personModule from "./modules/company/infrastructure/company-dependencies";
import customerModule from "./modules/customer/infrastructure/customer-dependencies";
import employeeModule from "./modules/employee/infrastructure/employee-dependencies";
import userRoleModule from "./modules/user-role/infrastructure/user-role-dependencies";
import itemModule from "./modules/item/infrastructure/item-dependencies";
import saleModule from "./modules/sale/infrastructure/sale-dependencies";
import inventoryModule from "./modules/inventory/infrastructure/inventory-dependencies";
import orderModule from "./modules/order/infrastructure/order-dependencies";
import companyModule from "./modules/company/infrastructure/company-dependencies";
import discountModule from "./modules/discount/infrastructure/discount-dependencies";
import taxModule from "./modules/tax/infrastructure/tax-dependencies";
import providerModule from "./modules/provider/infrastructure/provider-dependencies";
import menuModule from "./modules/menu/infrastructure/menu-dependencies";
import contactModule from "./modules/contact/infrastructure/contact-dependencies";
import jobModule from "./modules/job/infrastructure/job-dependencies";
import orderItemModule from "./modules/order-item/infrastructure/order-item-dependencies";
import categoryModule from "./modules/category/infrastructure/category-dependencies";
import itemModifierModule from "./modules/modifier/infrastructure/item-modifier-dependencies";
import itemVariantModule from "./modules/variant/infrastructure/item-variant-dependencies";

export default new Server({
	routes: [
		userModule.router,
		authModule.router,
		personModule.router,
		employeeModule.router,
		customerModule.router,
		userRoleModule.router,
		saleModule.router,
		inventoryModule.router,
		itemModule.router,
		categoryModule.router,
		itemVariantModule.router,
		itemModifierModule.router,
		menuModule.router,
		orderModule.router,
		companyModule.router,
		discountModule.router,
		taxModule.router,
		providerModule.router,
		contactModule.router,
		jobModule.router,
		orderItemModule.router,
	],
	middlewares: [],
});
