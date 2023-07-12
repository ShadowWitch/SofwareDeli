import { NextFunction, Request, Response } from "express";

import { Order } from "../../../domain/order.model";
import { OrderServices } from "../../../application/order-services";

export class OrderController {
	constructor(private readonly orderService: OrderServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const itemsList = await this.orderService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: itemsList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: itemsList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOrder(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const itemFound = await this.orderService.findById(id);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOrderByCode(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { code } = req.params;

		try {
			const itemFound = await this.orderService.findByCode(code);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOrderItems(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const itemFound = await this.orderService.findOrderItemsByOrderId(
				id
			);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOrderItem(req: Request, res: Response, next: NextFunction) {
		const { id, item_id } = req.params;

		try {
			const itemFound = await this.orderService.findOrderItemsByOrderId(
				id
			);

			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const itemData: Order = req.body;

		try {
			const itemCreated = await this.orderService.createOne(itemData);

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
		const itemData: Order = req.body;

		try {
			const itemUpdated = await this.orderService.updateById(
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
			const itemDeleted = await this.orderService.deleteById(id);

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
		const itemsDeleted = await this.orderService.deleteMany(ids);

		try {
			return res.status(200).json(itemsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
