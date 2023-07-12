import * as React from "react";

import { cn } from "@lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errors?: string | any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [inputType, setInputType] = React.useState(type);

		return (
			<div className="relative">
				<input
					type={inputType}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						props.errors ? "!ring-red-500 border-red-500" : "ring-primary",
						className
					)}
					ref={ref}
					value={inputType === "number" ? Number(props.value) : props.value}
					{...props}
				/>
				{type === "password" && (
					<Button
						type="button"
						size={"sm"}
						className="absolute top-1/2 right-1 transform -translate-y-1/2"
						variant={"ghost"}
						onClick={() => setInputType(inputType === "password" ? "text" : "password")}
					>
						{inputType === "password" ? (
							<Eye className="h-4 w-4 text-muted-foreground" />
						) : (
							<EyeOff className="h-4 w-4 text-muted-foreground" />
						)}
					</Button>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export { Input };
