"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialContactSchema = exports.contactSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.contactSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(3).max(255),
    website_url: zod_1.z.string().url().optional(),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.partialContactSchema = exports.contactSchema.partial();
