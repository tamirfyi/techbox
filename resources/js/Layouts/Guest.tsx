import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="mx-auto bg-orange-500 border-b border-gray-100 max-w-7xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex gap-4">
                            <Link
                                href={"/"}
                                method="get"
                                as="button"
                                type="button"
                                className="font-bold"
                            >
                                techbox
                            </Link>
                            <section className="flex items-center justify-center gap-2 text-sm">
                                <Link
                                    href={"/welcome"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    welcome
                                </Link>
                                <p className="text-xs">|</p>
                                <Link
                                    href={"/newest"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    new
                                </Link>
                                <p className="text-xs">|</p>
                                <Link
                                    href={"/ask"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    ask
                                </Link>
                                <p className="text-xs">|</p>
                                <Link
                                    href={"/show"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    show
                                </Link>
                                <p className="text-xs">|</p>
                                <Link
                                    href={"/jobs"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    jobs
                                </Link>
                                <p className="text-xs">|</p>
                                <Link
                                    href={"/submit"}
                                    method="get"
                                    as="button"
                                    type="button"
                                >
                                    submit
                                </Link>
                            </section>
                        </div>

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

            <main className="p-6 mx-auto max-w-7xl">{children}</main>
        </div>
    );
}
