import { NextFunction, Request, Response } from "express";

import { Contact } from "../../../domain/contact.model";
import { ContactServices } from "../../../application/contact-services";

export class ContactController {
	constructor(private readonly contactService: ContactServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const categoriesList = await this.contactService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: categoriesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: categoriesList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const categoryFound = await this.contactService.findById(id);
			return res.status(200).json(categoryFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const categoryData: Contact = req.body;

		try {
			const categoryCreated = await this.contactService.createOne(categoryData);

			const httpResponse = {
				data: categoryCreated,
				message: "Created",
			};
			res.status(201).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async updateOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;
		const categoryData: Contact = req.body;

		try {
			const categoryUpdated = await this.contactService.updateById(id, categoryData);

			const httpResponse = {
				data: categoryUpdated,
				message: "Updated",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const categoryDeleted = await this.contactService.deleteById(id);

			const httpResponse = {
				data: categoryDeleted,
				message: "Deleted",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteSeveral(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { ids } = req.body;
		const categoriesDeleted = await this.contactService.deleteMany(ids);

		try {
			return res.status(200).json(categoriesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
