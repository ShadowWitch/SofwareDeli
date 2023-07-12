import { Order } from "./order.model";
import { IBaseRepository } from "../../../shared/domain/repository";
import { OrderItem } from "@prisma/client";

export interface OrderRepository extends IBaseRepository<Order> {
	// GET /orders/code/:code
	findByCode(name: string): Promise<Order | null>;
	// GET /orders/customer/:customer_id
	findByCustomerId(customerId: string): Promise<Order[]>;
	// GET /orders/:id/items
	findOrderItemsByOrderId(id: string): Promise<OrderItem[]>;
	// GET /orders/:id/items/:item_id
	findOrderItemByOrderItemId(
		orderId: string,
		orderItemId: string
	): Promise<OrderItem>;
	// POST /orders/:id/items
	// addOrderItem(orderId: string, orderItem: OrderItem): Promise<OrderItem>;
	// // POST /orders/:id/discounts
	// addDiscountByOrderId(orderId: string, discountId: string): Promise<Order>;
}
