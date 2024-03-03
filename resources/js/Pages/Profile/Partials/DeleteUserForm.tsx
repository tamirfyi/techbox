import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const onDeleteUser = (e: any) => {
        if (
            confirm(
                "do you really want to delete your account? all data associated with your account will be removed."
            )
        ) {
            deleteUser(e);
        }
    };

    const onDeleteUserError = () => {
        alert("we could not delete your account. please try again later.");
    };

    const onDeleteUserSuccess = (e: any) => {
        alert("your account has been deleted.");
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => onDeleteUserSuccess,
            onError: () => onDeleteUserError,
            onFinish: () => reset(),
        });
    };

    return (
        <form onSubmit={onDeleteUser} className="space-y-4">
            <p>enter your current password to delete your account</p>

            <div className="flex flex-col gap-1">
                <label htmlFor="password">current password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="block w-full"
                    placeholder="password"
                />
            </div>

            <InputError message={errors.password} className="mt-2" />

            <input type="submit" value={"submit"} />
        </form>
    );
}
