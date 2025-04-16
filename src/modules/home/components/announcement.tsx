import Link from "next/link";

export const Announcement = () => {
    return (
        <div className="bg-black px-4 py-2 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <span className="hidden md:block">USD</span>
                <span className="text-center uppercase">
                    FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25–28.{" "}
                </span>
                <Link
                    href="/support"
                    className="hidden hover:underline md:block"
                >
                    Support
                </Link>
            </div>
        </div>
    );
};
