import { prisma } from "../../../config/prisma";
import { ContactServices } from "../application/contact-services";
import { ContactController } from "./http/controllers/contact.controller";
import { ContactRouter } from "./http/routes/contact.routes";
import { PrismaContactRepository } from "./persistence/prisma-contact-repository";

const contactRepository = new PrismaContactRepository(prisma);
const contactServices = new ContactServices(contactRepository);
const contactController = new ContactController(contactServices);
const contactRouter = new ContactRouter(contactController);

const contactDependencies = {
	controller: contactController,
	services: contactServices,
	repository: contactRepository,
	router: contactRouter,
};

export default contactDependencies;
