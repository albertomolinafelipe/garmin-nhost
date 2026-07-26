import { useMemo, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandEmpty,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TagsInputProps {
	value: string[];
	onChange: (value: string[]) => void;
	suggestions?: string[];
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	"aria-label"?: string;
}

function TagsInput({
	value,
	onChange,
	suggestions = [],
	placeholder,
	disabled,
	className,
	"aria-label": ariaLabel = "Add tag",
}: TagsInputProps) {
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);
	const available = useMemo(
		() =>
			suggestions.filter(
				(suggestion) =>
					!value.includes(suggestion) &&
					suggestion.toLowerCase().includes(inputValue.toLowerCase()),
			),
		[inputValue, suggestions, value],
	);
	const add = (raw: string) => {
		const tag = raw.trim();
		if (!tag || value.includes(tag)) {
			return;
		}
		onChange([...value, tag]);
		setInputValue("");
		setOpen(false);
	};
	const remove = (tag: string) =>
		onChange(value.filter((item) => item !== tag));
	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputValue.trim()) {
			event.preventDefault();
			add(inputValue);
		}
		if (event.key === "Backspace" && !inputValue && value.length) {
			event.preventDefault();
			onChange(value.slice(0, -1));
		}
	};

	return (
		<div
			data-slot="tags-input"
			className={cn("flex flex-wrap items-center gap-2", className)}
		>
			{value.map((tag) => (
				<Badge key={tag} variant="secondary">
					{tag}
					<button
						type="button"
						aria-label={`Remove ${tag}`}
						className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						disabled={disabled}
						onClick={() => remove(tag)}
					>
						<X />
					</button>
				</Badge>
			))}
			<Popover open={open && available.length > 0} onOpenChange={setOpen}>
				<PopoverAnchor asChild>
					<Input
						type="text"
						aria-label={ariaLabel}
						value={inputValue}
						disabled={disabled}
						placeholder={placeholder}
						className="min-w-32 flex-1"
						onFocus={() => setOpen(true)}
						onChange={(event) => {
							setInputValue(event.target.value);
							setOpen(true);
						}}
						onKeyDown={onKeyDown}
					/>
				</PopoverAnchor>
				<PopoverContent
					className="w-[var(--radix-popover-trigger-width)] p-0"
					onOpenAutoFocus={(event) => event.preventDefault()}
				>
					<Command>
						<CommandList>
							<CommandEmpty>No suggestions.</CommandEmpty>
							{available.map((suggestion) => (
								<CommandItem
									key={suggestion}
									value={suggestion}
									onSelect={() => add(suggestion)}
								>
									{suggestion}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export { TagsInput, type TagsInputProps };
