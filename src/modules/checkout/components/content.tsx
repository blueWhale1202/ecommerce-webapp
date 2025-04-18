import { CartList } from "@/modules/carts/components/cart-list";

type Props = {
    children?: React.ReactNode;
};

export const CheckoutContent = ({ children }: Props) => {
    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            {children}
            <CartList showCoupon />
        </div>
    );
};
