import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { OrderItemController } from "../controllers/order-item.controller";
import {
	partialOrderItemSchema,
	orderItemSchema,
} from "../../../domain/order-item.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class OrderItemRouter implements Route {
	public path = "/order-items";
	public router: Router = Router();

	constructor(private readonly orderItemController: OrderItemController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.orderItemController.getSeveral.bind(this.orderItemController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(orderItemSchema.pick({ id: true })),
			this.orderItemController.getOne.bind(this.orderItemController)
		);

		this.router.post(
			this.path,
			validateRequestBody(orderItemSchema),
			this.orderItemController.createOne.bind(this.orderItemController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: orderItemSchema.pick({ id: true }),
				body: partialOrderItemSchema,
			}),
			this.orderItemController.updateOneById.bind(
				this.orderItemController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(orderItemSchema.pick({ id: true })),
			this.orderItemController.deleteOneById.bind(
				this.orderItemController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.orderItemController.deleteSeveral.bind(
				this.orderItemController
			)
		);
	}
}
