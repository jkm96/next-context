import Link from "next/link";

export default function NotAuthenticated() {
    return(
        <div className="grid m-4 place-items-center">
            You are not authorized to access this resource.
            <Link className="text-blue-700" href="/login">Please Log in</Link>
        </div>
    );
}