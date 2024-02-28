import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Home({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
        </Authenticated>
    );
}
