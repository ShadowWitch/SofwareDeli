"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialOrderSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.orderSchema = zod_1.z
    .object({
    code: zod_1.z.string().min(1).max(255),
    name: zod_1.z.string().min(1).max(255),
    quantity: zod_1.z.number().min(1).max(255),
    price: zod_1.z.number().min(1).max(255),
    available: zod_1.z.boolean().default(true),
    provider_id: zod_1.z.string().uuid(),
    customer_id: zod_1.z.string().uuid(),
    type: zod_1.z.enum(["PURCHASE", "SALE", "OTHER"]),
    transaction_id: zod_1.z.string().uuid(),
    notes: zod_1.z.string().min(1).max(255).optional(),
    status: zod_1.z.enum(["PENDING", "PAID", "CANCELLED"]),
    total: zod_1.z.number().min(1).max(255),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.partialOrderSchema = exports.orderSchema.partial();
