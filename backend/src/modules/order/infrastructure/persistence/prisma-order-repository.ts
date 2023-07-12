import { PrismaClient, Order, OrderItem } from "@prisma/client";

import { Options } from "../../../../types";
import { OrderRepository } from "../../domain/order-repository";

export class PrismaOrderRepository implements OrderRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.order.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.order.findUnique({
			where: { id },
		});

		return item;
	}

	async findByCode(code: string) {
		const item = await this.prisma.order.findUnique({
			where: { code },
		});

		return item;
	}

	async findOrderItemByOrderItemId(
		orderId: string,
		orderItemId: string
	): Promise<OrderItem> {
		const item = await this.prisma.orderItem.findFirst({
			where: { order_id: orderId, id: orderItemId },
		});

		return item;
	}

	async addOrderItem(orderId: string, orderItem: OrderItem) {
		const item = await this.prisma.orderItem.create({
			data: {
				...orderItem,
				order_id: orderId,
			},
		});

		return item;
	}

	async findByCustomerId(customerId: string) {
		const items = await this.prisma.order.findMany({
			where: { customer_id: customerId },
		});

		return items;
	}

	async findOrderItemsByOrderId(id: string) {
		const items = await this.prisma.order
			.findUnique({
				where: { id },
				include: {
					order_items: true,
				},
			})
			.order_items();

		return items;
	}

	async createOne(data: Order) {
		const item = await this.prisma.order.create({
			data,
		});

		return item;
	}

	async createMany(data: Order[]) {
		const itemsCreated = (await this.prisma.order.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Order[];

		return itemsCreated;
	}

	async updateById(id: string, data: Order) {
		const item = await this.prisma.order.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Order>) {
		const itemsUpdated = (await this.prisma.order.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Order[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.order.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.order.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Order[];

		return itemsDeleted;
	}
}
