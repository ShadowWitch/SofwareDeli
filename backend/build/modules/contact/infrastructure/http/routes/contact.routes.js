"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRouter = void 0;
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const contact_schema_1 = require("../../../domain/contact.schema");
const authenticate_middleware_1 = require("../../../../../middlewares/authenticate.middleware");
class ContactRouter {
    constructor(contactController) {
        this.contactController = contactController;
        this.path = "/contacts";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, authenticate_middleware_1.isAuthenticated, this.contactController.getSeveral.bind(this.contactController));
        this.router.get(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(contact_schema_1.contactSchema.pick({ id: true })), this.contactController.getOne.bind(this.contactController));
        this.router.post(this.path, (0, zod_express_middleware_1.validateRequestBody)(contact_schema_1.contactSchema), this.contactController.createOne.bind(this.contactController));
        this.router.put(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequest)({
            params: contact_schema_1.contactSchema.pick({ id: true }),
            body: contact_schema_1.partialContactSchema,
        }), this.contactController.updateOneById.bind(this.contactController));
        this.router.delete(this.path + "/:id", authenticate_middleware_1.isAuthenticated, (0, zod_express_middleware_1.validateRequestParams)(contact_schema_1.contactSchema.pick({ id: true })), this.contactController.deleteOneById.bind(this.contactController));
        this.router.delete(this.path, authenticate_middleware_1.isAuthenticated, this.contactController.deleteSeveral.bind(this.contactController));
    }
}
exports.ContactRouter = ContactRouter;
