import { cn } from "@/lib/utils";

type Props = {
    colors: string[];
};

export const ColorGroup = ({ colors }: Props) => {
    if (!colors || colors.length === 0) {
        return null;
    }

    const maxVisible = 2;
    const visibleColors = colors.slice(0, maxVisible);
    const hiddenCount = colors.length - maxVisible;

    return (
        <div className="flex -space-x-3">
            {visibleColors.map((color, index) => (
                <div
                    key={index}
                    className="size-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                />
            ))}

            {hiddenCount > 0 && (
                <div
                    className={cn(
                        "flex size-6 items-center justify-center rounded-full border-2 border-white text-xs text-white",
                    )}
                    style={{ backgroundColor: colors[maxVisible] }}
                >
                    +{hiddenCount}
                </div>
            )}
        </div>
    );
};
