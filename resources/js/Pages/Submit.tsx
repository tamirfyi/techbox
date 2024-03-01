import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import InputError from "../Components/InputError";

export default function Submit({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        url: "",
        text: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("submit"));
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Techbox" />
            <form onSubmit={submit} className="flex flex-col items-start gap-2">
                <div className="flex gap-2">
                    <label htmlFor="title">title</label>
                    <input
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="url">url</label>
                    <input
                        id="url"
                        name="url"
                        value={data.url}
                        onChange={(e) => setData("url", e.target.value)}
                    />
                    <InputError message={errors.url} className="mt-2" />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="text">text</label>
                    <input
                        id="text"
                        name="text"
                        value={data.text}
                        onChange={(e) => setData("text", e.target.value)}
                    />
                    <InputError message={errors.text} className="mt-2" />
                </div>
                <button type="submit">submit</button>
            </form>
        </Authenticated>
    );
}
