import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputError from "../Components/InputError";

export default function Submit({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        url: "",
        text: "",
    });

    const submit = (e) => {
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
                <input type="submit" value="submit" />
            </form>
        </Authenticated>
    );
}
