import Authenticated from "@/Layouts/Authenticated";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";

enum SubmissionCategory {
    All = 0,
    Ask = 1,
    Show = 2,
    Jobs = 3,
}

export default function Submit({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        url: "",
        text: "",
        category: SubmissionCategory.All,
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("submit"));
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
            <form onSubmit={submit} className="space-y-4">
                <table>
                    <tbody>
                        <tr>
                            <td className="pr-2">board</td>
                            <td>
                                <select
                                    onChange={(e) =>
                                        setData(
                                            "category",
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option
                                        defaultChecked
                                        value={SubmissionCategory.All}
                                    >
                                        all
                                    </option>
                                    <option value={SubmissionCategory.Ask}>
                                        ask
                                    </option>
                                    <option value={SubmissionCategory.Show}>
                                        show
                                    </option>
                                    <option value={SubmissionCategory.Jobs}>
                                        jobs
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">title</td>
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
                            <td className="pr-2">url</td>
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
                            <td className="pr-2">text</td>
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
                <input type="submit" value="submit" />
            </form>
        </Authenticated>
    );
}
