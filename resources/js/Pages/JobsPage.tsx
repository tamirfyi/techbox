import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { PageProps, SubmissionItem } from "@/types";
import HomeSubmissionPreview from "../Components/HomeSubmissionPreview";

interface HomePageProps extends PageProps {
    submissions: Array<SubmissionItem>;
}

export default function JobsPage({ auth, submissions }: HomePageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />

            <section className="flex flex-col gap-2">
                {submissions.length > 0 ? (
                    submissions.map((submission, index) => {
                        return (
                            <HomeSubmissionPreview
                                key={submission.id}
                                submission={submission}
                                index={index + 1}
                            />
                        );
                    })
                ) : (
                    <p className="text-sm">no posts</p>
                )}
            </section>
        </Authenticated>
    );
}
