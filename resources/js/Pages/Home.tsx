import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import HomeSubmissionPreview from "../Components/HomeSubmissionPreview";

export default function Home({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />

            {/* List of posts */}
            <section className="flex flex-col gap-2">
                <HomeSubmissionPreview
                    index={1}
                    title={"My new blog site"}
                    link={"http://tamir.fyi"}
                    timeSincePosted={"1 min ago"}
                    username={"admin"}
                    numComments={0}
                    numPoints={0}
                />
                <HomeSubmissionPreview
                    index={2}
                    title={`What's the best way to learn about ML?`}
                    timeSincePosted={"1 min ago"}
                    username={"admin"}
                    numComments={0}
                    numPoints={0}
                />
            </section>
        </Authenticated>
    );
}
