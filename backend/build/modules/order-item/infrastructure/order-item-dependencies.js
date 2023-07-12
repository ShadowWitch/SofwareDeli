"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const order_item_services_1 = require("../application/order-item-services");
const order_item_controller_1 = require("./http/controllers/order-item.controller");
const order_item_routes_1 = require("./http/routes/order-item.routes");
const prisma_order_item_repository_1 = require("./persistence/prisma-order-item-repository");
const orderItemRepository = new prisma_order_item_repository_1.PrismaOrderItemRepository(prisma_1.prisma);
const orderItemServices = new order_item_services_1.OrderItemServices(orderItemRepository);
const orderItemController = new order_item_controller_1.OrderItemController(orderItemServices);
const orderItemRouter = new order_item_routes_1.OrderItemRouter(orderItemController);
const orderItemDependencies = {
    controller: orderItemController,
    services: orderItemServices,
    repository: orderItemRepository,
    router: orderItemRouter,
};
exports.default = orderItemDependencies;
