"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
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
import { Button } from "@components/ui/button";
import { Icons } from "@components/icons";
import { Combobox } from "@components/ui/combobox";
import { useToast } from "@components/ui/use-toast";
import { Textarea } from "@components/ui/textarea";
import { useCreateItem } from "@hooks/item/use-create-item";
import { useGetSeveralItems } from "@hooks/item/use-get-several-items";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface ItemFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VirtualRestaurantTerminalForm({ className, ...props }: ItemFormProps) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createSale } = useCreateItem();

	const severalItemsQuery = useGetSeveralItems();
	const itemsList = severalItemsQuery.data?.data?.data || [];
	const itemsListOptions = formatList(itemsList, "name", "id");

	const form = useForm<Sale>({
		resolver: zodResolver(saleSchema),
		defaultValues: {},
	});

	const { fields, append } = useFieldArray({
		name: "items",
		control: form.control,
	});

	const onSubmit: SubmitHandler<Sale> = (formData: Sale) => {
		const formDataFormatted = clearObject(formData);

		createSale(
			{ data: formDataFormatted },
			{
				onSuccess: (response) => response.status === 201 && form.reset(),
			}
		);
	};

	return (
		<div>
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 grid-cols-3">
							<div className="col-span-2">
								<div className="grid gap-4">
									<div className="flex items-center gap-4">
										{itemsListOptions?.map((item) => {
											return (
												<div
													key={item.value}
													className="w-1/4"
													onClick={() => {
														form.setValue("items", [
															{
																id: item.value,
																quantity:
																	form.getValues(
																		`items.0.quantity`
																	) + 1,
															},
														]);
														console.log(
															form.getValues(`items.0.quantity`)
														);
													}}
												>
													<span className="h-[100px]">{item.label}</span>
												</div>
											);
										})}
									</div>
									<FormField
										control={form.control}
										name="note"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nota</FormLabel>
												<FormControl>
													<Textarea {...field} disabled={isLoading} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div>
								<div className="space-y-4">
									{/* Sale Details */}
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-500">Subtotal</div>
										<div className="text-sm font-medium">
											{formatCurrency(1000)}
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-500">Descuento</div>
										<div className="text-sm font-medium">
											{formatCurrency(1000)}
										</div>
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-500">Total</div>
										<div className="text-sm font-medium">
											{formatCurrency(1000)}
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
					</form>
				</div>
			</Form>
		</div>
	);
}
