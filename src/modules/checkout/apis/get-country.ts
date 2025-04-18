import { useEffect, useState } from "react";

type ResponseData = {
    data: {
        iso2: string;
        country: string;
        cities: string[];
    }[];
};

type CountryOption = {
    value: string;
    label: string;
};

type CityOptions = Record<string, CountryOption[]>;

export const useGetCountries = () => {
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [cities, setCities] = useState<CityOptions>({});

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    "https://countriesnow.space/api/v0.1/countries",
                );
                const items = (await response.json()) as ResponseData;
                const formattedCountries = items.data
                    .map((item) => ({
                        value: item.iso2,
                        label: item.country,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));

                const formattedCities = items.data.reduce((acc, item) => {
                    return {
                        ...acc,
                        [item.iso2]: item.cities
                            .map((city) => ({
                                value: city,
                                label: city,
                            }))
                            .sort((a, b) => a.label.localeCompare(b.label)),
                    };
                }, {});

                setCountries(formattedCountries);
                setCities(formattedCities);
            } catch (error) {
                console.log("🚀 ~ handler: ~ error:", error);
            }
        };

        fetchCountries();
    }, []);

    return { countries, cityMap: cities };
};
