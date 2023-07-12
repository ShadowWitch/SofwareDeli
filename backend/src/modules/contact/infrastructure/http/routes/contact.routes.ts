import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ContactController } from "../controllers/contact.controller";
import {
	partialContactSchema,
	contactSchema,
} from "../../../domain/contact.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ContactRouter implements Route {
	public path = "/contacts";
	public router: Router = Router();

	constructor(private readonly contactController: ContactController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.contactController.getSeveral.bind(this.contactController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(contactSchema.pick({ id: true })),
			this.contactController.getOne.bind(this.contactController)
		);

		this.router.post(
			this.path,
			validateRequestBody(contactSchema),
			this.contactController.createOne.bind(this.contactController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: contactSchema.pick({ id: true }),
				body: partialContactSchema,
			}),
			this.contactController.updateOneById.bind(this.contactController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(contactSchema.pick({ id: true })),
			this.contactController.deleteOneById.bind(this.contactController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.contactController.deleteSeveral.bind(this.contactController)
		);
	}
}
