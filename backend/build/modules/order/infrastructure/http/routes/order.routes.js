"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const order_schema_1 = require("../../../domain/order.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class OrderRouter {
    constructor(orderController) {
        this.orderController = orderController;
        this.path = "/orders";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, authenticate_middleware_1.isAuthenticated, this.orderController.getSeveral.bind(this.orderController));
        this.router.get(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_schema_1.orderSchema.pick({ id: true })), this.orderController.getOrder.bind(this.orderController));
        this.router.get(this.path + "/code/:code", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_schema_1.orderSchema.pick({ code: true })), this.orderController.getOrderByCode.bind(this.orderController));
        this.router.get(this.path + "/:id/items", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_schema_1.orderSchema.pick({ id: true })), this.orderController.getOrderItems.bind(this.orderController));
        this.router.get(this.path + "/:id/items/:item_id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_schema_1.orderSchema.pick({ id: true })), this.orderController.getOrderItem.bind(this.orderController));
        // Add discount
        this.router.post(this.path, (0, zod_express_middleware_1.validateRequestBody)(order_schema_1.orderSchema), this.orderController.createOne.bind(this.orderController));
        this.router.put(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequest)({
            params: order_schema_1.orderSchema.pick({ id: true }),
            body: order_schema_1.partialOrderSchema,
        }), this.orderController.updateOneById.bind(this.orderController));
        this.router.delete(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_schema_1.orderSchema.pick({ id: true })), this.orderController.deleteOneById.bind(this.orderController));
        this.router.delete(this.path, authenticate_middleware_1.isAuthenticated, this.orderController.deleteSeveral.bind(this.orderController));
    }
}
exports.OrderRouter = OrderRouter;
