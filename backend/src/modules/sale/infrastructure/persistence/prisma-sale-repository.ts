import { PrismaClient, Sale } from "@prisma/client";

import { Options } from "../../../../types";
import { SaleRepository } from "../../domain/sale-repository";

export class PrismaSaleRepository implements SaleRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.sale.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.sale.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: Sale) {
		const itemCreated = await this.prisma.sale.create({
			data,
		});

		return itemCreated;
	}

	async createMany(data: Sale[]) {
		const itemsCreated = (await this.prisma.sale.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Sale[];

		return itemsCreated;
	}

	async updateById(id: string, data: Sale) {
		const item = await this.prisma.sale.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(
		ids: string[],
		data: Partial<Sale>
	): Promise<number | Sale[]> {
		const itemsUpdated = (await this.prisma.sale.updateMany({
			where: { id: { in: ids } },
			data,
		})) as unknown as number | Sale[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.sale.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]): Promise<number | Sale[]> {
		const itemsDeleted = (await this.prisma.sale.deleteMany({
			where: { id: { in: ids } },
		})) as unknown as number | Sale[];

		return itemsDeleted;
	}
}
