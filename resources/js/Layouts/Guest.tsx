import { PropsWithChildren } from "react";
import { Link, router } from "@inertiajs/react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="mx-auto bg-orange-500 border-b border-gray-100 max-w-7xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">
                        <Link
                            href={"/"}
                            method="get"
                            as="button"
                            type="button"
                            className="font-bold"
                        >
                            techbox
                        </Link>

                        <div className="flex justify-center items-center gap-1.5 text-sm">
                            <Link
                                href="/login"
                                method="get"
                                as="button"
                                type="button"
                            >
                                log in
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
