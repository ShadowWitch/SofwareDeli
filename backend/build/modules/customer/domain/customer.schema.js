"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialCustomerSchema = exports.customerSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.customerSchema = zod_1.z
    .object({
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(8).max(14).optional(),
    first_name: zod_1.z.string().min(2).max(100),
    middle_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().min(2).max(100),
    birthdate: zod_1.z.date().optional(),
    id_card: zod_1.z.string().min(7).max(13),
    rtn: zod_1.z.string().min(10).max(14).optional(),
    contact_id: zod_1.z.string().uuid().optional(),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.partialCustomerSchema = exports.customerSchema.partial();
