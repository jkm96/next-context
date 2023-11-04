"use client";
import {useAuth} from "@/hooks/useAuth";
import LogoutForm from "@/components/auth/LogoutForm";
import NotAuthenticated from "@/components/shared/NotAuthenticated";

export default function Profile() {
    const { user } = useAuth();

    if (!user) {
      return <NotAuthenticated/>
    }

    return (
        <div className="grid m-4 place-items-center">
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}!</p>
            <p>Id: {user.id}!</p>
            <LogoutForm/>
        </div>
    );
}
