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
exports.PrismaOrderItemRepository = void 0;
class PrismaOrderItemRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.prisma.orderItem.findMany({
                where: options === null || options === void 0 ? void 0 : options.where,
                take: (_a = options === null || options === void 0 ? void 0 : options.pagination) === null || _a === void 0 ? void 0 : _a.limit,
                skip: (_b = options === null || options === void 0 ? void 0 : options.pagination) === null || _b === void 0 ? void 0 : _b.offset,
            });
            return items;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem.findUnique({
                where: { id },
            });
            return item;
        });
    }
    findByItemId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem
                .findUnique({
                where: { id },
            })
                .Item();
            return item;
        });
    }
    createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem.create({
                data,
            });
            return item;
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsCreated = (yield this.prisma.orderItem.createMany({
                data,
                skipDuplicates: true,
            }));
            return itemsCreated;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.prisma.orderItem.update({
                where: { id },
                data,
            });
            return item;
        });
    }
    updateMany(ids, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsUpdated = (yield this.prisma.orderItem.updateMany({
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
            const item = yield this.prisma.orderItem.delete({
                where: { id },
            });
            return item;
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsDeleted = (yield this.prisma.orderItem.deleteMany({
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
exports.PrismaOrderItemRepository = PrismaOrderItemRepository;
