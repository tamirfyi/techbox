import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { PageProps, SubmissionItem } from "@/types";

interface HomePageProps extends PageProps {
    submission: SubmissionItem;
}

export default function Home({ auth, submission }: HomePageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
            <section className="flex flex-col gap-2">
                <p>{submission.title}</p>
            </section>
        </Authenticated>
    );
}
