import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { OrderController } from "../controllers/order.controller";
import { partialOrderSchema, orderSchema } from "../../../domain/order.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class OrderRouter implements Route {
	public path = "/orders";
	public router: Router = Router();

	constructor(private readonly orderController: OrderController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.orderController.getSeveral.bind(this.orderController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(orderSchema.pick({ id: true })),
			this.orderController.getOrder.bind(this.orderController)
		);

		this.router.get(
			this.path + "/code/:code",
			isAuthenticated,
			validateRequestParams(orderSchema.pick({ code: true })),
			this.orderController.getOrderByCode.bind(this.orderController)
		);

		this.router.get(
			this.path + "/:id/items",
			isAuthenticated,
			validateRequestParams(orderSchema.pick({ id: true })),
			this.orderController.getOrderItems.bind(this.orderController)
		);

		this.router.get(
			this.path + "/:id/items/:item_id",
			isAuthenticated,
			validateRequestParams(orderSchema.pick({ id: true })),
			this.orderController.getOrderItem.bind(this.orderController)
		);
		// Add discount

		this.router.post(
			this.path,
			validateRequestBody(orderSchema),
			this.orderController.createOne.bind(this.orderController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: orderSchema.pick({ id: true }),
				body: partialOrderSchema,
			}),
			this.orderController.updateOneById.bind(this.orderController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(orderSchema.pick({ id: true })),
			this.orderController.deleteOneById.bind(this.orderController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.orderController.deleteSeveral.bind(this.orderController)
		);
	}
}
