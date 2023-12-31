"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialEmployeeSchema = exports.employeeSchema = void 0;
const zod_1 = require("zod");
const generic_schema_1 = require("../../../shared/infrastructure/validations/generic-schema");
exports.employeeSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean().optional(),
    first_name: zod_1.z.string().trim().min(2).max(50),
    middle_name: zod_1.z.string().trim().min(2).max(50).optional(),
    last_name: zod_1.z.string().trim().min(2).max(50),
    id_card: zod_1.z.string().trim().min(2).max(50),
    birthdate: zod_1.z.date().min(new Date("1900-01-01")).max(new Date()),
    job_id: zod_1.z.string().uuid(),
    company_id: zod_1.z.string().uuid(),
    // contact_id: z.string().uuid().optional(),
    contract_type: zod_1.z.enum([
        "FULL_TIME",
        "PART_TIME",
        "TEMPORARY",
        "VOLUNTEER",
        "OTHER",
    ]),
})
    .merge(generic_schema_1.genericSchema.partial());
exports.partialEmployeeSchema = exports.employeeSchema.partial();
