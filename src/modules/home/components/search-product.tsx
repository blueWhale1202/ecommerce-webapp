"use client";

import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchProduct = () => {
    const [filters, setFilters] = useFilters();
    const [value, setValue] = useState(filters.search);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    };

    return (
        <form className="relative flex items-center" onSubmit={onSubmit}>
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
        </form>
    );
};
