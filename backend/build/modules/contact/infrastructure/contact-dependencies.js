"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const contact_services_1 = require("../application/contact-services");
const contact_controller_1 = require("./http/controllers/contact.controller");
const contact_routes_1 = require("./http/routes/contact.routes");
const prisma_contact_repository_1 = require("./persistence/prisma-contact-repository");
const contactRepository = new prisma_contact_repository_1.PrismaContactRepository(prisma_1.prisma);
const contactServices = new contact_services_1.ContactServices(contactRepository);
const contactController = new contact_controller_1.ContactController(contactServices);
const contactRouter = new contact_routes_1.ContactRouter(contactController);
const contactDependencies = {
    controller: contactController,
    services: contactServices,
    repository: contactRepository,
    router: contactRouter,
};
exports.default = contactDependencies;
