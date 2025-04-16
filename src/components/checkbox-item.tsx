import { Check } from "lucide-react";

type Props = {
    children: React.ReactNode;
    className?: string;
    name?: string;
    value?: string;
    checked?: boolean;
};

export const CheckboxItem = ({
    children,
    className,
    name,
    value,
    checked,
}: Props) => {
    return (
        <label className="flex cursor-pointer items-center gap-3">
            <input
                type="checkbox"
                name={name}
                value={value}
                hidden
                checked={checked}
            />
            <div className="relative flex size-5 items-center justify-center border-1 border-black">
                {checked && <Check className="size-4 text-black" />}
            </div>
            <span>{children}</span>
        </label>
    );
};
