import { prisma } from "../../../config/prisma";
import { OrderItemServices } from "../application/order-item-services";
import { OrderItemController } from "./http/controllers/order-item.controller";
import { OrderItemRouter } from "./http/routes/order-item.routes";
import { PrismaOrderItemRepository } from "./persistence/prisma-order-item-repository";

const orderItemRepository = new PrismaOrderItemRepository(prisma);
const orderItemServices = new OrderItemServices(orderItemRepository);
const orderItemController = new OrderItemController(orderItemServices);
const orderItemRouter = new OrderItemRouter(orderItemController);

const orderItemDependencies = {
	controller: orderItemController,
	services: orderItemServices,
	repository: orderItemRepository,
	router: orderItemRouter,
};

export default orderItemDependencies;
