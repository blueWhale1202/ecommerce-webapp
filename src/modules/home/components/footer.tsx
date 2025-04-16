import Link from "next/link";
import { FOOTER_LINKS } from "../constants";
import { NewLetter } from "./new-letter";

export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-[#f2f4f8] py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row">
                    <NewLetter />
                    <div className="grid grid-cols-1 gap-8 md:w-2/3 md:grid-cols-3 md:pl-16">
                        {FOOTER_LINKS.map((item) => (
                            <div key={item.label}>
                                <h3 className="mb-4 font-bold">{item.label}</h3>
                                <ul className="space-y-2">
                                    {item.items.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-600 hover:text-black"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
