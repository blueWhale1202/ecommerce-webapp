export function generateMonths() {
    return Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return {
            value: month.toString().padStart(2, "0"),
            label: month.toString().padStart(2, "0"),
        };
    });
}

export function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => {
        const year = currentYear + i;
        return {
            value: year.toString(),
            label: year.toString(),
        };
    });

    return years;
}
