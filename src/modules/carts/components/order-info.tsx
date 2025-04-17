import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SHIPPING_OPTIONS } from "../constants";

export const OrderInformation = () => {
    return (
        <div className="mt-12 max-w-3xl">
            <h2 className="mb-4 text-xl font-bold">Order Information</h2>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="return-policy">
                    <AccordionTrigger className="border-t border-gray-200 py-4 text-base font-medium">
                        Return Policy
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-600">
                        <p>
                            This is our example return policy which is
                            everything you need to know about our returns.
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            <li>
                                You have 30 days to return an item from the date
                                you received it.
                            </li>
                            <li>
                                To be eligible for a return, your item must be
                                unused and in the same condition that you
                                received it.
                            </li>
                            <li>
                                Your item must be in the original packaging.
                            </li>
                            <li>
                                Your item needs to have the receipt or proof of
                                purchase.
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping-options">
                    <AccordionTrigger className="border-t border-gray-200 py-4 text-base font-medium">
                        Shipping Options
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                        <div className="space-y-4">
                            {SHIPPING_OPTIONS.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-start"
                                >
                                    <input
                                        type="radio"
                                        id={`shipping-${option.id}`}
                                        name="shipping"
                                        className="mt-1 mr-3"
                                    />
                                    <label
                                        htmlFor={`shipping-${option.id}`}
                                        className="flex-grow"
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                {option.name}
                                            </span>
                                            <span>
                                                ${option.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {option.deliveryTime}
                                        </p>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <div className="border-t border-gray-200"></div>
            </Accordion>
        </div>
    );
};
