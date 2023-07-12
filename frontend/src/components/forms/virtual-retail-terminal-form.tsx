"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import * as React from "react";

import { Sale, saleSchema } from "@lib/validations/sale";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/react-hook-form/form";
import { Input } from "@components/ui/input";
import { clearObject, cn, formatCurrency, formatList } from "@lib/utils";
import { Textarea } from "@components/ui/textarea";
import { useCreateItem } from "@hooks/item/use-create-item";
import { useGetSeveralItems } from "@hooks/item/use-get-several-items";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
} from "@components/ui/card";
import { useGetSeveralCustomers } from "@hooks/customer/use-get-several-customers";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Combobox } from "@components/ui/combobox";
import { Button } from "@components/ui/button";
import { useGetSeveralDiscounts } from "@hooks/discount/use-get-several-discounts";
import { useCreateSale } from "@hooks/sale/use-create-sale";
import { ButtonProps } from "react-day-picker";
import { useGetSeveralTaxes } from "~/src/hooks/tax/use-get-several-taxes";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { CustomerForm } from "./customer-form";

interface VirtualTerminalFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function SaleForm({ className, ...props }: VirtualTerminalFormProps) {
	return <div></div>;
}

export function CustomerDialogForm({ className, ...props }: VirtualTerminalFormProps) {
	return (
		<Dialog>
			<DialogTrigger className="font-semibold">Crear Cliente</DialogTrigger>
			<DialogContent>
				<AlertDialogHeader>
					<DialogTitle>Registrar Cliente</DialogTitle>
					<DialogDescription>
						Complete los campos para registrar un nuevo cliente.
					</DialogDescription>
				</AlertDialogHeader>
				<CustomerForm />
			</DialogContent>
		</Dialog>
	);
}

export function VirtualRetailTerminalForm({ className, ...props }: VirtualTerminalFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const createSaleQuery = useCreateSale();

	const severalCustomersQuery = useGetSeveralCustomers();
	const customersList = severalCustomersQuery.data?.data?.data || [];
	const customersListOptions = customersList.map((customer: any) => ({
		value: customer.id,
		label:
			customer.first_name +
			" " +
			customer.last_name +
			" - " +
			(customer.id_card ?? customer.rtn),
	}));

	const severalItemsQuery = useGetSeveralItems();
	const itemsList = severalItemsQuery.data?.data?.data || [];
	const itemsListOptions = formatList(itemsList, "name", "id");

	const severalTaxesQuery = useGetSeveralTaxes();
	const taxesList = severalTaxesQuery.data?.data?.data || [];
	const taxesListOptions = formatList(taxesList, "name", "id");

	const severalDiscountsQuery = useGetSeveralDiscounts();
	const [saleData, setSaleData] = React.useState({
		subtotal: 0,
		tax: 0,
		discount: 0,
		total: 0,
	});

	const form = useForm<Sale>({
		resolver: zodResolver(saleSchema),
		defaultValues: {
			subtotal: 0,
			total: 0,
			note: "",
		},
	});

	// const fieldArray = useFieldArray({
	// 	name: "items",
	// 	control: form.control,
	// });

	const discountsList = severalDiscountsQuery.data?.data?.data || [];
	const discountsListOptions = formatList(discountsList, "name", "id");
	const discountInput = form.watch("discount_id");
	const taxInput = form.watch("tax_id");
	const discountFound =
		discountInput && discountsList.find((discount: any) => discount.id === discountInput);
	const taxFound = taxInput && taxesList.find((tax: any) => tax.id === taxInput);
	const subtotal = form.watch("subtotal");

	React.useEffect(() => {
		const discountType = discountFound && discountFound?.amount_type;
		const discount =
			discountType === "PERCENTAGE"
				? (subtotal * discountFound.amount) / 100
				: discountFound?.amount || 0;
		const tax = (taxFound && (subtotal * taxFound.rate) / 100) || 0;
		const total = subtotal - discount + tax;
		setSaleData({
			subtotal,
			tax: 0,
			discount,
			total,
		});
		form.setValue("total", total);
	}, [subtotal, discountFound, taxFound, form]);

	const onSubmit: SubmitHandler<Sale> = (formData: Sale) => {
		setIsLoading(true);
		const formDataFormatted = clearObject(formData);

		createSaleQuery.mutate(formDataFormatted, {
			onSuccess: (response) => response.status === 201 && form.reset(),
		});
		setIsLoading(false);
	};

	return (
		<div>
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 grid-cols-3">
							<div className="col-span-2">
								<FormControl>
									<Tabs defaultValue="quick-charge" className="max-w-xl">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger value="quick-charge">
												Cobro rápido
											</TabsTrigger>
											<TabsTrigger value="itemized-sale">
												Venta detallada
											</TabsTrigger>
										</TabsList>
										<TabsContent value="quick-charge" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Transacción</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="subtotal"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Monto</FormLabel>
																<FormControl>
																	<Input
																		{...field}
																		type="number"
																		placeholder="e.g. 10.00"
																		min={0}
																		autoCorrect="off"
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="discount_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Descuento</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={discountsListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="tax_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Impuesto</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={taxesListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="note"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Nota</FormLabel>
																<FormControl>
																	<Textarea
																		{...field}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Pago</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="customer_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Clientes</FormLabel>
																<FormControl>
																	<Combobox
																		notFoundAction={
																			<CustomerDialogForm />
																		}
																		{...field}
																		form={form}
																		data={customersListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													{/* <FormField
														control={form.control}
														name="payment_method"
														render={({ field }) => (
															<FormItem className="space-y-3">
																<FormLabel>
																	Método de pago
																</FormLabel>
																<FormControl>
																	<RadioGroup
																		onValueChange={
																			field.onChange
																		}
																		defaultValue={field.value}
																		className="flex flex-col space-y-1"
																	>
																		<FormItem className="flex items-center space-x-3 space-y-0">
																			<FormControl>
																				<RadioGroupItem value="cash" />
																			</FormControl>
																			<FormLabel className="font-normal">
																				Efectivo
																			</FormLabel>
																		</FormItem>
																		<FormItem className="flex items-center space-x-3 space-y-0">
																			<FormControl>
																				<RadioGroupItem value="electronic" />
																			</FormControl>
																			<FormLabel className="font-normal">
																				Electrónico
																			</FormLabel>
																		</FormItem>
																	</RadioGroup>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/> */}
												</CardContent>
											</Card>
										</TabsContent>
										{/* <TabsContent value="itemized-sale" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Transacción</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													{fieldArray.fields.map((field, index) => (
														<div key={field.id}></div>
													))}
													<FormField
														control={form.control}
														name="items"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Items</FormLabel>
																<FormControl>
																	<Combobox
																		onSelect={(e: any) => {
																			e.preventDefault();
																			fieldArray.append({
																				id: "",
																				quantity: 1,
																			});
																		}}
																		{...field}
																		form={form}
																		data={itemsListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="discount_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Descuento</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={discountsListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="note"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Nota</FormLabel>
																<FormControl>
																	<Textarea
																		{...field}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Pago</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="customer_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Clientes</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={customersListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
										</TabsContent> */}
									</Tabs>
								</FormControl>
							</div>
							<div className="col-span-1">
								<div>
									<div className="space-y-4">
										{/* Sale Details */}
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Subtotal</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.subtotal)}
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Descuento</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.discount)}
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Impuesto</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.tax)}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Total</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.total)}
											</div>
										</div>
									</div>
									<div>
										<Button className="w-full mt-4" isLoading={isLoading}>
											Pagar
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
