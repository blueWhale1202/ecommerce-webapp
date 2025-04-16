import { Announcement } from "@/modules/home/components/announcement";
import { Footer } from "@/modules/home/components/footer";
import { Header } from "@/modules/home/components/header";
import { Sections } from "@/modules/home/components/sections";

export default async function AppPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <Announcement />
            <Header />
            <Sections />
            <Footer />
        </main>
    );
}
