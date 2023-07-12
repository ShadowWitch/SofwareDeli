import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { OrderRepository } from "../domain/order-repository";
import { Order } from "../domain/order.model";

export class OrderServices {
	constructor(private readonly orderRepository: OrderRepository) {}

	public async findServeral(options: Options): Promise<Order[]> {
		const where: object = {};

		const itemsFound = await this.orderRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Order> {
		const itemFound = await this.orderRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findOrderItemsByOrderId(id: string) {
		const itemsFound = await this.orderRepository.findOrderItemsByOrderId(
			id
		);
		if (!itemsFound) {
			throw new NotFoundException();
		}

		return itemsFound;
	}

	public async findOrderItemByOrderItemId(orderId: string, orderItemId: string) {
		const itemsFound = await this.orderRepository.findOrderItemByOrderItemId(
			orderId,
			orderItemId
		);
		if (!itemsFound) {
			throw new NotFoundException();
		}

		return itemsFound;
	}

	public async findByCode(code: string): Promise<Order> {
		const itemFound = await this.orderRepository.findByCode(code);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Order) {
		const itemAlreadyExists = await this.orderRepository.findByCode(
			data.code
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.orderRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Order>): Promise<Order> {
		const itemUpdated = await this.orderRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Order> {
		const itemDeleted = await this.orderRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.orderRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
