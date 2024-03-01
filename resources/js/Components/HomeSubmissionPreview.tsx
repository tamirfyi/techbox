import React from "react";
import { SubmissionItem } from "../types";

interface HomeSubmissionPreviewProps {
    index: number;
    submission: SubmissionItem;
}

const HomeSubmissionPreview = ({
    index,
    submission,
}: HomeSubmissionPreviewProps) => {
    const submissionMetaDataString = `[points] points by [username] [timeSinecPosted] | [comments] comments`;

    return (
        <div className="flex gap-2">
            <p className="text-sm">{`${index}.`}</p>
            <div className="flex flex-col">
                <div className="flex items-center justify-start gap-2">
                    <p className="text-sm hover:cursor-pointer">{`${submission.title}`}</p>
                    {submission.url && (
                        <a
                            href={submission.url}
                            target="_blank"
                            className="text-xs text-gray-600 hover:underline underline-offset-1"
                        >{`(${submission.url})`}</a>
                    )}
                </div>
                <p className="text-xs">{submissionMetaDataString}</p>
            </div>
        </div>
    );
};

export default HomeSubmissionPreview;
