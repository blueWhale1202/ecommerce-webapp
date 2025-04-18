"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type OptionType = {
    value: string;
    label: string;
};

interface FormComboboxProps {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    options: OptionType[];
    emptyMessage?: string;
    className?: string;
    searchPlaceholder?: string;
}

export function FormCombobox({
    name,
    label,
    placeholder = "Select an option",
    description,
    options,
    emptyMessage = "No options found.",
    className,
    searchPlaceholder = "Search...",
}: FormComboboxProps) {
    return (
        <FormField
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={false}
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value
                                        ? options.find(
                                              (option) =>
                                                  option.value === field.value,
                                          )?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command
                                    filter={(_, search, keywords) => {
                                        if (
                                            keywords
                                                ?.join("")
                                                .toLocaleLowerCase()
                                                .includes(
                                                    search.toLocaleLowerCase(),
                                                )
                                        ) {
                                            return 1;
                                        }
                                        return 0;
                                    }}
                                >
                                    <CommandInput
                                        placeholder={searchPlaceholder}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {emptyMessage}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    keywords={[option.label]}
                                                    key={option.value}
                                                    value={option.value}
                                                    onSelect={(value) => {
                                                        field.onChange(
                                                            value ===
                                                                field.value
                                                                ? ""
                                                                : value,
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value ===
                                                                option.value
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        )}
                                                    />
                                                    {option.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
