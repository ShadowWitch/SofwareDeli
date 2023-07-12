"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Customer, customerSchema } from "@lib/validations/customer";
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
import { clearObject, cn, formatList } from "@lib/utils";
import { Button } from "@components/ui/button";
import { useCreateCustomer } from "@hooks/customer/use-create-customer";
import { useUpdateCustomer } from "@hooks/customer/use-update-customer";
import { DatePicker } from "@components/date-picker";

interface CustomerFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Customer;
}

export function CustomerForm({ className, ...props }: CustomerFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createCustomer } = useCreateCustomer();
	const { mutate: updateCustomer } = useUpdateCustomer();

	const form = useForm<Customer>({
		resolver: zodResolver(customerSchema),
		defaultValues: props.data ?? {
			first_name: "",
			middle_name: "",

			last_name: "",
			id_card: "",
			rtn: "",
		},
	});

	React.useEffect(() => setIsLoading(form.formState.isSubmitting), [form.formState.isSubmitting]);

	const onSubmit: SubmitHandler<Customer> = (formData: Customer) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateCustomer({ id: props.data.id, data: formDataFormatted });
		}

		createCustomer({ data: formDataFormatted });
		form.reset();
	};

	return (
		<div className="max-w-2xl">
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. Juan"
													autoCorrect="off"
													disabled={isLoading}
													autoFocus
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Apellido</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. Perez"
													autoCorrect="off"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Correo electrónico</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="name@example.com"
												autoCapitalize="none"
												autoComplete="email"
												autoCorrect="off"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="id_card"
									render={({ field }) => (
										<FormItem>
											<FormLabel>DNI</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. 123456789123"
													minLength={8}
													maxLength={13}
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
									name="rtn"
									render={({ field }) => (
										<FormItem>
											<FormLabel>RTN</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													minLength={10}
													maxLength={14}
													placeholder="e.g 12345678901234"
													autoCorrect="off"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button
									variant="outline"
									type="reset"
									onClick={() => {
										form.setFocus("first_name");
										form.reset();
									}}
								>
									Cancelar
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
