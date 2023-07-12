"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitType = exports.SystemClient = exports.PaymentType = exports.OrderStatus = exports.OrderType = exports.TransactionStatus = exports.TransactionType = exports.DiscountType = exports.SessionRevokedReason = exports.PayrollType = exports.EmployeeContractType = void 0;
exports.EmployeeContractType = {
    FULL_TIME: "FULL_TIME",
    PART_TIME: "PART_TIME",
    TEMPORARY: "TEMPORARY",
    INTERNSHIP: "INTERNSHIP",
    VOLUNTEER: "VOLUNTEER",
    OTHER: "OTHER",
};
exports.PayrollType = {
    SALARY: "SALARY",
    BONUS: "BONUS",
    COMMISSION: "COMMISSION",
    OVERTIME: "OVERTIME",
    ALLOWANCE: "ALLOWANCE",
    OTHER: "OTHER",
};
exports.SessionRevokedReason = {
    REVOKED: "REVOKED",
    LOGOUT: "LOGOUT",
    EXPIRED: "EXPIRED",
};
exports.DiscountType = {
    PERCENTAGE: "PERCENTAGE",
    FIXED: "FIXED",
};
exports.TransactionType = {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE",
};
exports.TransactionStatus = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED",
};
exports.OrderType = {
    PURCHASE: "PURCHASE",
    SALE: "SALE",
};
exports.OrderStatus = {
    PENDING: "PENDING",
    PAID: "PAID",
    CANCELLED: "CANCELLED",
};
exports.PaymentType = {
    CASH: "CASH",
    CARD: "CARD",
    TRANSFER: "TRANSFER",
    OTHER: "OTHER",
};
exports.SystemClient = {
    HTTP_CLIENT: "HTTP_CLIENT",
    DELI_JUNIOR: "DELI_JUNIOR",
    ALESSANDROS_FOOD: "ALESSANDROS_FOOD",
};
exports.UnitType = {
    LENGTH: "LENGTH",
    AREA: "AREA",
    VOLUME: "VOLUME",
    WEIGHT: "WEIGHT",
    TIME: "TIME",
    DIGITAL: "DIGITAL",
    OTHER: "OTHER",
};
