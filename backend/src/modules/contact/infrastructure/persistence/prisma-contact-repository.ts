import { PrismaClient, Contact } from "@prisma/client";

import { Options } from "../../../../types";
import { ContactRepository } from "../../domain/contact-repository";

export class PrismaContactRepository implements ContactRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.contact.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.contact.findUnique({
			where: { id },
		});

		return item;
	}

	async findByPhone(phone: string) {
		const item = await this.prisma.contact.findUnique({
			where: { phone },
		});

		return item;
	}

	async createOne(data: Contact) {
		const item = await this.prisma.contact.create({
			data,
		});

		return item;
	}

	async createMany(data: Contact[]) {
		const itemsCreated = (await this.prisma.contact.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Contact[];

		return itemsCreated;
	}

	async updateById(id: string, data: Contact) {
		const item = await this.prisma.contact.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Contact>) {
		const itemsUpdated = (await this.prisma.contact.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Contact[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.contact.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.contact.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Contact[];

		return itemsDeleted;
	}
}
