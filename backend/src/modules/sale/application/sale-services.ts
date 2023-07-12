import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { SaleRepository } from "../domain/sale-repository";
import { Sale } from "../domain/sale.model";

export class SaleServices {
	constructor(private readonly saleRepository: SaleRepository) {}

	public async findServeral(options: Options): Promise<Sale[]> {
		const where: object = {};

		const itemsFound = await this.saleRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Sale> {
		const itemFound = await this.saleRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Sale): Promise<Sale> {
		const itemCreated = await this.saleRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Sale>): Promise<Sale> {
		const itemUpdated = await this.saleRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Sale> {
		const itemDeleted = await this.saleRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.saleRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
