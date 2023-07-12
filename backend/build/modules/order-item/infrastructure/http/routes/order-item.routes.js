"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const order_item_schema_1 = require("../../../domain/order-item.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class OrderItemRouter {
    constructor(orderItemController) {
        this.orderItemController = orderItemController;
        this.path = "/order-items";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, authenticate_middleware_1.isAuthenticated, this.orderItemController.getSeveral.bind(this.orderItemController));
        this.router.get(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_item_schema_1.orderItemSchema.pick({ id: true })), this.orderItemController.getOne.bind(this.orderItemController));
        this.router.post(this.path, (0, zod_express_middleware_1.validateRequestBody)(order_item_schema_1.orderItemSchema), this.orderItemController.createOne.bind(this.orderItemController));
        this.router.put(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequest)({
            params: order_item_schema_1.orderItemSchema.pick({ id: true }),
            body: order_item_schema_1.partialOrderItemSchema,
        }), this.orderItemController.updateOneById.bind(this.orderItemController));
        this.router.delete(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(order_item_schema_1.orderItemSchema.pick({ id: true })), this.orderItemController.deleteOneById.bind(this.orderItemController));
        this.router.delete(this.path, authenticate_middleware_1.isAuthenticated, this.orderItemController.deleteSeveral.bind(this.orderItemController));
    }
}
exports.OrderItemRouter = OrderItemRouter;
