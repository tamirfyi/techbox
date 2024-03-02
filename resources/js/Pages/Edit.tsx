import Authenticated from "@/Layouts/Authenticated";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps, SubmissionItem } from "@/types";

interface EditPageProps extends PageProps {
    submission: SubmissionItem;
}

export default function Edit({ auth, submission }: EditPageProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: submission.title || "",
        url: submission.url || "",
        text: submission.text || "",
    });

    const submit = (e: any) => {
        e.preventDefault();
        put(route("item.update", submission.id));
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
            <form onSubmit={submit} className="space-y-4">
                <table>
                    <tbody>
                        <tr>
                            <td className="space-x-4">title</td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="space-x-4">url</td>
                            <td>
                                <input
                                    type="url"
                                    name="url"
                                    value={data.url}
                                    onChange={(e) =>
                                        setData("url", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pt-4">text</td>
                            <td>
                                <textarea
                                    name="text"
                                    rows={10}
                                    cols={40}
                                    value={data.text}
                                    onChange={(e) =>
                                        setData("text", e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="save" />
            </form>
        </Authenticated>
    );
}
