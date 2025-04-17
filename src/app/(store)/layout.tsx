import { Footer } from "@/modules/home/components/footer";
import { Header } from "@/modules/home/components/header";

type Props = {
    children: React.ReactNode;
};

export default async function ShopLayout({ children }: Props) {
    return (
        <main className="flex min-h-screen flex-col">
            <Header variant="dark" />
            {children}
            <Footer variant="dark" />
        </main>
    );
}
