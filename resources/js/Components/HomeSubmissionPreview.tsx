import React from "react";
import { SubmissionItem } from "../types";
import { formatDistance } from "date-fns";
import { Link } from "@inertiajs/react";

interface HomeSubmissionPreviewProps {
    index: number;
    submission: SubmissionItem;
}

const HomeSubmissionPreview = ({
    index,
    submission,
}: HomeSubmissionPreviewProps) => {
    const created = new Date(submission.created_at);
    const current = new Date();
    const timeAgo = formatDistance(created, current, { addSuffix: true });
    const submissionMetaDataString = `0 points by ${submission.username} ${timeAgo}`;

    return (
        <div className="flex gap-2">
            <p className="text-sm">{`${index}.`}</p>
            <div className="flex flex-col">
                <div className="flex items-center justify-start gap-1">
                    <Link
                        href={route("item", { id: submission.id })}
                        className="text-sm hover:cursor-pointer"
                    >{`${submission.title}`}</Link>
                    {submission.url && (
                        <a
                            href={submission.url}
                            target="_blank"
                            className="text-xs text-gray-500 hover:underline underline-offset-1"
                        >{`(${submission.url})`}</a>
                    )}
                </div>
                <div className="flex gap-1 text-xs">
                    <p>{submissionMetaDataString}</p>
                    <p>|</p>
                    <p>0 comments</p>
                </div>
            </div>
        </div>
    );
};

export default HomeSubmissionPreview;
