"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderRepository = void 0;
class PrismaOrderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.order.findMany({
                where: options === null || options === void 0 ? void 0 : options.where,
                take: (_a = options === null || options === void 0 ? void 0 : options.pagination) === null || _a === void 0 ? void 0 : _a.limit,
                skip: (_b = options === null || options === void 0 ? void 0 : options.pagination) === null || _b === void 0 ? void 0 : _b.offset,
            });
            return items;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.order.findUnique({
                where: { id },
            });
            return item;
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.order.findUnique({
                where: { code },
            });
            return item;
        });
    }
    findOrderItemByOrderItemId(orderId, orderItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem.findFirst({
                where: { order_id: orderId, id: orderItemId },
            });
            return item;
        });
    }
    addOrderItem(orderId, orderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem.create({
                data: Object.assign(Object.assign({}, orderItem), { order_id: orderId }),
            });
            return item;
        });
    }
    findByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.order.findMany({
                where: { customer_id: customerId },
            });
            return items;
        });
    }
    findOrderItemsByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.order
                .findUnique({
                where: { id },
                include: {
                    order_items: true,
                },
            })
                .order_items();
            return items;
        });
    }
    createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.order.create({
                data,
            });
            return item;
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsCreated = (yield this.prisma.order.createMany({
                data,
                skipDuplicates: true,
            }));
            return itemsCreated;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.order.update({
                where: { id },
                data,
            });
            return item;
        });
    }
    updateMany(ids, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsUpdated = (yield this.prisma.order.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data,
            }));
            return itemsUpdated;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.order.delete({
                where: { id },
            });
            return item;
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsDeleted = (yield this.prisma.order.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            }));
            return itemsDeleted;
        });
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
