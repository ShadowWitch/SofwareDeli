import { NextFunction, Request, Response } from "express";

import { OrderItem } from "../../../domain/order-item.model";
import { OrderItemServices } from "../../../application/order-item-services";

export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const orderItemList = await this.orderItemService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: orderItemList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: orderItemList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const itemFound = await this.orderItemService.findById(id);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const itemData: OrderItem = req.body;

		try {
			const itemCreated = await this.orderItemService.createOne(itemData);

			const httpResponse = {
				data: itemCreated,
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
		const itemData: OrderItem = req.body;

		try {
			const itemUpdated = await this.orderItemService.updateById(
				id,
				itemData
			);

			const httpResponse = {
				data: itemUpdated,
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
			const itemDeleted = await this.orderItemService.deleteById(id);

			const httpResponse = {
				data: itemDeleted,
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
		const itemsDeleted = await this.orderItemService.deleteMany(ids);

		try {
			return res.status(200).json(itemsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
