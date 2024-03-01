import React from "react";
import { SubmissionItem } from "../types";
import { formatDistance, subDays } from "date-fns";

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
    const submissionMetaDataString = `0 points by ${submission.username} ${timeAgo} | 0 comments`;

    return (
        <div className="flex gap-2">
            <p className="text-sm">{`${index}.`}</p>
            <div className="flex flex-col">
                <div className="flex items-center justify-start gap-1">
                    <p className="text-sm hover:cursor-pointer">{`${submission.title}`}</p>
                    {submission.url && (
                        <a
                            href={submission.url}
                            target="_blank"
                            className="text-xs text-gray-500 hover:underline underline-offset-1"
                        >{`(${submission.url})`}</a>
                    )}
                </div>
                <p className="text-xs">{submissionMetaDataString}</p>
            </div>
        </div>
    );
};

export default HomeSubmissionPreview;
