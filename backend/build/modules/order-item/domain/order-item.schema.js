"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialOrderItemSchema = exports.orderItemSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.orderItemSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(3).max(255),
    description: zod_1.z.string().min(3).max(255),
    company_id: zod_1.z.string().uuid(),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.partialOrderItemSchema = exports.orderItemSchema.partial();
