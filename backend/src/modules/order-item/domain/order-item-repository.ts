import { OrderItem } from "./order-item.model";
import { IBaseRepository } from "../../../shared/domain/repository";
import { Item } from "../../item/domain/item.model";

export interface OrderItemRepository extends IBaseRepository<OrderItem> {
	findByItemId(id: string): Promise<Item | null>;
}
