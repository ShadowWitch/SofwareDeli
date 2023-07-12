import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { OrderItemRepository } from "../domain/order-item-repository";
import { OrderItem } from "../domain/order-item.model";

export class OrderItemServices {
	constructor(private readonly orderItemRepository: OrderItemRepository) {}

	public async findServeral(options: Options): Promise<OrderItem[]> {
		const where: object = {};

		const itemsFound = await this.orderItemRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<OrderItem> {
		const itemFound = await this.orderItemRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: OrderItem) {
		const itemAlreadyExists = await this.orderItemRepository.findById(
			data.id
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.orderItemRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<OrderItem>
	): Promise<OrderItem> {
		const itemUpdated = await this.orderItemRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<OrderItem> {
		const itemDeleted = await this.orderItemRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.orderItemRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
