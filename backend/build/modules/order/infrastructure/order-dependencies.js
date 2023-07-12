"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const order_services_1 = require("../application/order-services");
const order_controller_1 = require("./http/controllers/order.controller");
const order_routes_1 = require("./http/routes/order.routes");
const prisma_order_repository_1 = require("./persistence/prisma-order-repository");
const orderRepository = new prisma_order_repository_1.PrismaOrderRepository(prisma_1.prisma);
const orderServices = new order_services_1.OrderServices(orderRepository);
const orderController = new order_controller_1.OrderController(orderServices);
const orderRouter = new order_routes_1.OrderRouter(orderController);
const orderDependencies = {
    controller: orderController,
    services: orderServices,
    repository: orderRepository,
    router: orderRouter,
};
exports.default = orderDependencies;
