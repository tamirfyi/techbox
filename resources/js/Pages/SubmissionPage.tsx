import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { formatDistance, sub } from "date-fns";
import { PageProps, ReplyItem, SubmissionItem } from "@/types";
import { useState } from "react";
import clsx from "clsx";

interface SubmissionPageProps extends PageProps {
    submission: SubmissionItem;
    replies: Array<ReplyItem>;
}

export default function SubmissionPage({
    auth,
    submission,
    replies,
}: SubmissionPageProps) {
    const created = new Date(submission.created_at);
    const current = new Date();
    const timeAgo = formatDistance(created, current, { addSuffix: true });
    const submissionMetaDataString = `by ${submission.username} ${timeAgo} `;

    const { data, setData, post, processing, errors, reset } = useForm({
        reply: "",
    });

    const onSubmitComment = (e: any) => {
        e.preventDefault();
        post(
            route("reply", {
                text: data.reply,
                reply_id: null,
                submission_id: submission.id,
            })
        );
        setData("reply", "");
    };

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
                            </>
                        )}
                    </div>
                </div>
                <p className="pb-4">{submission.text}</p>
                <form onSubmit={onSubmitComment} className="pb-10">
                    <textarea
                        cols={64}
                        rows={5}
                        className="text-sm"
                        value={data.reply}
                        onChange={(e) => setData("reply", e.target.value)}
                    />
                    <input
                        className="block"
                        type="submit"
                        value={"add reply"}
                    />
                </form>
                <section className="space-y-4">
                    {replies.map((reply: ReplyItem) => {
                        const created = new Date(reply.created_at);
                        const current = new Date();
                        const timeAgo = formatDistance(created, current, {
                            addSuffix: true,
                        });

                        const replyWithMetaData = `by ${reply.username} ${timeAgo}`;
                        return (
                            <div className="">
                                <p className="pb-0.5 text-xs">
                                    {replyWithMetaData}
                                </p>
                                <p className="pb-1">{reply.text}</p>
                                <button className="text-xs underline hover:text-gray-600">
                                    reply
                                </button>
                            </div>
                        );
                    })}
                </section>
            </section>
        </Authenticated>
    );
}
