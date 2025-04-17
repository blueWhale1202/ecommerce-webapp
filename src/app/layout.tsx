import { ConvexClientProvider } from "@/providers/convex-client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ecommerce - Better clothing for the planet",
    description: "Shop sustainable and stylish clothing for everyone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConvexClientProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </ConvexClientProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
