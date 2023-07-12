"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialSaleSchema = exports.saleCreateSchema = exports.saleSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.saleSchema = zod_1.z
    .object({
    created_by: zod_1.z.string().uuid().optional(),
    payment_method: zod_1.z.enum(["CASH", "CARD", "TRANSFER", "OTHER"]).optional(),
    total: zod_1.z.number().min(0).nonnegative(),
    subtotal: zod_1.z.number().min(0).nonnegative(),
    note: zod_1.z.string().optional(),
    order_id: zod_1.z.string().uuid().optional(),
    customer_id: zod_1.z.string().uuid().optional(),
    discount_id: zod_1.z.string().uuid().optional(),
    tax_id: zod_1.z.string().uuid().optional(),
    // payment_id: z.string().uuid().optional(),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.saleCreateSchema = exports.saleSchema
    .omit({
    id: true,
    created_at: true,
    updated_at: true,
})
    .merge(zod_1.z.object({
    items: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().min(1).nonnegative(),
    }))
        .nonempty({
        message: "Sale must have at least one item",
    }),
}));
exports.partialSaleSchema = exports.saleSchema.partial();
