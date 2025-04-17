"use client";

import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchProduct = () => {
    const [filters, setFilters] = useFilters();
    const [value, setValue] = useState(filters.search);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(filters.search);
    }, [filters.search]);

    const onSearch = useDebouncedCallback((value: string) => {
        setFilters({ ...filters, search: value });
    }, 500);

    const onChange = (value: string) => {
        setValue(value);
        onSearch(value);
    };

    return (
        <div className="relative flex items-center">
            <Search className="text-muted-foreground absolute left-3 size-5" />
            <Input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="bg-white py-1 pr-4 pl-10 text-black"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onFocus={() => {
                    inputRef.current?.select();
                }}
            />
        </div>
    );
};
