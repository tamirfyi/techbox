import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, router } from "@inertiajs/react";
import { formatDistance } from "date-fns";
import { PageProps, SubmissionItem } from "@/types";
import { useState } from "react";
import clsx from "clsx";

interface SubmissionPageProps extends PageProps {
    submission: SubmissionItem;
}

export default function Submission({ auth, submission }: SubmissionPageProps) {
    const created = new Date(submission.created_at);
    const current = new Date();
    const timeAgo = formatDistance(created, current, { addSuffix: true });
    const submissionMetaDataString = `0 points by ${submission.username} ${timeAgo} `;

    const onDelete = () => {
        if (confirm("do you really want to delete your submission?")) {
            router.put(route("item.delete", submission.id));
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
            <section className="space-y-4 text-sm">
                <div className="flex flex-col">
                    <p>{`${submission.title}`}</p>
                    <div className="flex gap-1 text-xs">
                        <p>{submissionMetaDataString}</p>
                        <p>|</p>
                        {submission.user_id == auth.user.id && (
                            <>
                                <Link
                                    className="hover:text-gray-600"
                                    href={route("item.edit", submission.id)}
                                >
                                    edit
                                </Link>
                                <p>|</p>
                                <button
                                    className="hover:text-gray-600"
                                    onClick={onDelete}
                                >
                                    delete
                                </button>
                                <p>|</p>
                            </>
                        )}
                        <p>0 comments</p>
                    </div>
                </div>
                <textarea cols={64} rows={5} className="text-sm" />
                <input className="block" type="submit" value={"add comment"} />
            </section>
        </Authenticated>
    );
}
