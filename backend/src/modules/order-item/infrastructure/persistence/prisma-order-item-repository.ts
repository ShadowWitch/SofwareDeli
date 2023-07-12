import { PrismaClient, OrderItem } from "@prisma/client";

import { Options } from "../../../../types";
import { OrderItemRepository } from "../../domain/order-item-repository";

export class PrismaOrderItemRepository implements OrderItemRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.orderItem.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.orderItem.findUnique({
			where: { id },
		});

		return item;
	}

	async findByItemId(id: string) {
		const item = await this.prisma.orderItem
			.findUnique({
				where: { id },
			})
			.Item();

		return item;
	}

	async createOne(data: OrderItem) {
		const item = await this.prisma.orderItem.create({
			data,
		});

		return item;
	}

	async createMany(data: OrderItem[]) {
		const itemsCreated = (await this.prisma.orderItem.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | OrderItem[];

		return itemsCreated;
	}

	async updateById(id: string, data: OrderItem) {
		const item = await this.prisma.orderItem.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<OrderItem>) {
		const itemsUpdated = (await this.prisma.orderItem.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | OrderItem[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.orderItem.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.orderItem.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | OrderItem[];

		return itemsDeleted;
	}
}
