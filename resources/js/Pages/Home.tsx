import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { PageProps, SubmissionItem } from "@/types";
import HomeSubmissionPreview from "../Components/HomeSubmissionPreview";

interface HomePageProps extends PageProps {
    submissions: Array<SubmissionItem>;
}

export default function Home({ auth, submissions }: HomePageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />

            {/* List of posts */}
            <section className="flex flex-col gap-2">
                {submissions.map((submission, index) => {
                    return (
                        <HomeSubmissionPreview
                            submission={submission}
                            index={index + 1}
                        />
                    );
                })}
            </section>
        </Authenticated>
    );
}
