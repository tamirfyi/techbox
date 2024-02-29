import React from "react";

interface HomeSubmissionPreviewProps {
    index: number;
    title: string;
    link?: string;
    numPoints: number;
    username: string;
    timeSincePosted: string;
    numComments: number;
}

const HomeSubmissionPreview = ({
    index,
    title,
    link,
    numPoints,
    username,
    timeSincePosted,
    numComments,
}: HomeSubmissionPreviewProps) => {
    const submissionHeaderString = `${title}`;
    const submissionMetaDataString = `${numPoints} points by ${username} ${timeSincePosted} | ${numComments} comments`;

    return (
        <div className="flex gap-2">
            <p className="text-sm">{`${index}.`}</p>
            <div className="flex flex-col">
                <div className="flex items-center justify-start gap-2">
                    <p className="text-sm hover:cursor-pointer">{`${title}`}</p>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            className="text-xs text-gray-600 hover:underline underline-offset-1"
                        >{`(${link})`}</a>
                    )}
                </div>
                <p className="text-xs">{submissionMetaDataString}</p>
            </div>
        </div>
    );
};

export default HomeSubmissionPreview;
