"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { ItemCategory, itemCategorySchema } from "@lib/validations/item-category";
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
import { clearObject, cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { useCreateItemCategory } from "@hooks/item-category/use-create-item-category";
import { useUpdateItemCategory } from "@hooks/item-category/use-update-item-category";

interface ItemCategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: ItemCategory;
}

export function ItemCategoryForm({ className, ...props }: ItemCategoryFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createItemCategory } = useCreateItemCategory();
	const { mutate: updateItemCategory } = useUpdateItemCategory();

	const form = useForm<ItemCategory>({
		resolver: zodResolver(itemCategorySchema),
		defaultValues: props.data ?? {
			name: "",
			description: "",
		},
	});

	React.useEffect(() => setIsLoading(form.formState.isSubmitting), [form.formState.isSubmitting]);

	const onSubmit: SubmitHandler<ItemCategory> = (formData: ItemCategory) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateItemCategory({
				id: props.data.id,
				data: formDataFormatted,
			});
		}

		createItemCategory(formDataFormatted);
		form.reset();
	};

	return (
		<div className="max-w-2xl">
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="e.g. Bebidas"
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
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción</FormLabel>
										<FormControl>
											<Textarea {...field} disabled={isLoading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button
									variant="outline"
									type="reset"
									onClick={() => {
										form.setFocus("name");
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
