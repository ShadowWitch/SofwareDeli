import { prisma } from "../../../config/prisma";
import { OrderServices } from "../application/order-services";
import { OrderController } from "./http/controllers/order.controller";
import { OrderRouter } from "./http/routes/order.routes";
import { PrismaOrderRepository } from "./persistence/prisma-order-repository";

const orderRepository = new PrismaOrderRepository(prisma);
const orderServices = new OrderServices(orderRepository);
const orderController = new OrderController(orderServices);
const orderRouter = new OrderRouter(orderController);

const orderDependencies = {
	controller: orderController,
	services: orderServices,
	repository: orderRepository,
	router: orderRouter,
};

export default orderDependencies;
