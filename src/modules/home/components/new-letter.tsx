import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewLetter = () => {
    return (
        <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="mb-2 text-3xl font-semibold">
                Sign up for our newsletter
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">
                Be the first to know about our special offers, new product
                launches, and events
            </p>
            <div className="flex">
                <Input
                    type="email"
                    placeholder="Email Address"
                    className="rounded-r-none bg-white text-black"
                />
                <Button className="rounded-l-none">Sign Up</Button>
            </div>
        </div>
    );
};
