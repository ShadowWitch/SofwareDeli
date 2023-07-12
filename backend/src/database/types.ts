import type { ColumnType, GeneratedAlways } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type {
	EmployeeContractType,
	PayrollType,
	SessionRevokedReason,
	DiscountType,
	TransactionType,
	TransactionStatus,
	OrderType,
	OrderStatus,
	PaymentType,
	SystemClient,
	UnitType,
} from "./enums";

export type Address = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	street: string;
	country: Generated<string>;
	state: Generated<string>;
	city: Generated<string>;
	contact_id: string | null;
};
export type Analytic = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	value: string;
	type: string;
};
export type Category = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
};
export type Company = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	name: string;
	bussiness_id: string;
	logo_url: string | null;
	contact_id: string | null;
};
export type Contact = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	email: string | null;
	phone: string | null;
};
export type Customer = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	email: string | null;
	phone: string | null;
	rtn: string | null;
	id_card: string | null;
	birthdate: Timestamp | null;
	company_id: string | null;
};
export type Discount = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	note: string | null;
	amount_type: Generated<DiscountType>;
	amount: number;
};
export type Employee = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	id_card: string;
	birthdate: Timestamp;
	enabled: Generated<boolean>;
	contract_type: Generated<EmployeeContractType>;
	job_id: string;
	company_id: string;
	contact_id: string | null;
};
export type Inventory = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	company_id: string;
};
export type Invoice = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	type: string;
	date: Timestamp;
	total: number;
	status: string;
};
export type InvoiceLote = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
};
export type Item = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	created_by: string | null;
	name: string;
	description: string | null;
	quantity: number | null;
	price: number;
	images: string[];
	discount_id: string | null;
	category_id: string | null;
	inventory_id: string;
	provider_id: string | null;
};
export type ItemModifier = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
};
export type ItemModifierOption = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	price: Generated<number>;
	item_modifier_id: string;
};
export type ItemVariant = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	options: string[];
};
export type Job = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string;
};
export type Log = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	client: SystemClient;
	type: string;
	message: string;
	table: string;
	query: string;
	row_id: string;
	row_data: unknown;
	hostname: string;
	ip: string;
	user_id: string;
};
export type Menu = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	image_url: string | null;
};
export type Order = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	code: string;
	total: number;
	type: OrderType;
	status: Generated<OrderStatus>;
	notes: string | null;
	customer_id: string;
	user_id: string | null;
};
export type OrderItem = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	quantity: number;
	price: string;
	note: string | null;
	order_id: string;
	item_id: string;
};
export type Payment = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	type: PaymentType;
	amount: number;
	note: string | null;
	transaction_id: string | null;
};
export type Payroll = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	amount: number;
	description: string | null;
	start_date: Timestamp;
	end_date: Timestamp;
	type: string;
};
export type PayrollItem = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	deductions: number;
	overtime: Generated<boolean>;
	salary: number;
	payroll_id: string;
	employee_id: string;
};
export type Provider = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	name: string;
	email: string | null;
	bussiness_id: string;
	contact_id: string | null;
};
export type Purchase = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	price: number;
	total: number;
};
export type Sale = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	payment_method: Generated<PaymentType | null>;
	subtotal: number;
	total: number;
	note: string | null;
	created_by: string | null;
	order_id: string | null;
	customer_id: string | null;
	tax_id: string | null;
	discount_id: string | null;
};
export type SecurityQuestion = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	question: string;
	user_id: string | null;
};
export type SecurityQuestionAnswer = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	answer: string;
	question_id: string;
};
export type Session = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	token: string;
	expires_in: Timestamp;
	revoked: Generated<boolean>;
	revoked_reason: Generated<SessionRevokedReason | null>;
	user_id: string;
};
export type Shift = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	start_date: Timestamp;
	end_date: Timestamp;
	terminal_id: string | null;
};
export type SystemSettings = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	value: string;
};
export type Tax = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	rate: number;
};
export type Terminal = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	company_id: string | null;
};
export type Transaction = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	type: TransactionType;
	description: string | null;
	status: Generated<TransactionStatus>;
	amount: number;
	sale_id: string | null;
};
export type Unit = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	type: UnitType;
	description: string | null;
	symbol: string | null;
};
export type User = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	email: string;
	username: string;
	password: string;
	enabled: Generated<boolean>;
	verified: Generated<boolean>;
	employee_id: string | null;
	user_role_id: string | null;
};
export type UserRole = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	name: string;
	description: string | null;
	users_permission: Generated<boolean>;
	dashboard_permission: Generated<boolean>;
	jobs_permission: Generated<boolean>;
	payrolls_permission: Generated<boolean>;
	user_roles_permission: Generated<boolean>;
	employees_permission: Generated<boolean>;
	customers_permission: Generated<boolean>;
	companies_permission: Generated<boolean>;
	inventories_permission: Generated<boolean>;
	orders_permission: Generated<boolean>;
	orders_items_permission: Generated<boolean>;
	menus_permission: Generated<boolean>;
	items_permission: Generated<boolean>;
	items_variations_permission: Generated<boolean>;
	items_modifiers_permission: Generated<boolean>;
	pos_permission: Generated<boolean>;
	terminals_permission: Generated<boolean>;
	categories_permission: Generated<boolean>;
	providers_permission: Generated<boolean>;
	taxes_permission: Generated<boolean>;
	discounts_permission: Generated<boolean>;
	transactions_permission: Generated<boolean>;
	invoices_permission: Generated<boolean>;
	payments_permission: Generated<boolean>;
	sales_permission: Generated<boolean>;
	purchases_permission: Generated<boolean>;
	logs_permission: Generated<boolean>;
};
export type UserRolePermission = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	key: string;
	key_group: string;
	user_role_id: string | null;
};
export type DB = {
	Address: Address;
	Analytic: Analytic;
	Category: Category;
	Company: Company;
	Contact: Contact;
	Customer: Customer;
	Discount: Discount;
	Employee: Employee;
	Inventory: Inventory;
	Invoice: Invoice;
	InvoiceLote: InvoiceLote;
	Item: Item;
	ItemModifier: ItemModifier;
	ItemModifierOption: ItemModifierOption;
	ItemVariant: ItemVariant;
	Job: Job;
	Log: Log;
	Menu: Menu;
	Order: Order;
	OrderItem: OrderItem;
	Payment: Payment;
	Payroll: Payroll;
	PayrollItem: PayrollItem;
	Provider: Provider;
	Purchase: Purchase;
	Sale: Sale;
	SecurityQuestion: SecurityQuestion;
	SecurityQuestionAnswer: SecurityQuestionAnswer;
	Session: Session;
	Shift: Shift;
	SystemSettings: SystemSettings;
	Tax: Tax;
	Terminal: Terminal;
	Transaction: Transaction;
	Unit: Unit;
	User: User;
	UserRole: UserRole;
	UserRolePermission: UserRolePermission;
};
