import Authenticated from "@/Layouts/Authenticated";
import { Head, router } from "@inertiajs/react";
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

    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [editedText, setEditedText] = useState<string>(submission.text);

    const onEdit = () => {
        setEditedText(editedText);
        router.visit(`/item/${submission.id}`, {
            method: "put",
            data: {
                text: editedText,
            },
        });
        setIsEditing(false);
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
                        <p>favorite</p>
                        <p>|</p>
                        {submission.user_id == auth.user.id && (
                            <>
                                <button
                                    className="hover:text-gray-600"
                                    onClick={() => setIsEditing(true)}
                                >
                                    edit
                                </button>
                                <p>|</p>
                            </>
                        )}
                        <p>0 comments</p>
                    </div>
                </div>
                <p className={clsx("block", { hidden: isEditing })}>
                    {submission.text}
                </p>
                <div className={clsx("block", { hidden: !isEditing })}>
                    <textarea
                        cols={64}
                        rows={5}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="text-sm"
                    />
                    <button onClick={onEdit} className="block">
                        save
                    </button>
                </div>
                <textarea cols={64} rows={5} className="text-sm" />
                <input className="block" type="submit" value={"add comment"} />
            </section>
        </Authenticated>
    );
}
