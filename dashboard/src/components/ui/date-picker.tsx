import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { iconifyIcon } from "@/lib/activity-types";
import { dayKey } from "@/lib/format";
import { cn } from "@/lib/utils";

const CalendarIcon = iconifyIcon("mdi:calendar");

interface DatePickerProps {
	value: string;
	onChange: (date: string) => void;
	id?: string;
	disabled?: boolean;
	placeholder?: string;
}

export function DatePicker({
	value,
	onChange,
	id,
	disabled,
	placeholder = "Pick a date",
}: DatePickerProps) {
	const [open, setOpen] = useState(false);
	const selected = value ? new Date(`${value}T00:00:00`) : undefined;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					type="button"
					variant="outline"
					disabled={disabled}
					className={cn(
						"w-full justify-start font-normal",
						!value && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="size-4" />
					{selected ? format(selected, "d MMM yyyy") : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					weekStartsOn={1}
					defaultMonth={selected}
					selected={selected}
					onSelect={(date) => {
						if (!date) return;
						onChange(dayKey(date));
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
