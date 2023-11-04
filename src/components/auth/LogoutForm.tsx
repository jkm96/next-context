import {Button} from "@nextui-org/react";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {deleteAccessToken} from "@/lib/token/tokenService";

export default function LogoutForm() {
    const {clearAuthToken} = useAuth();
    const router = useRouter();
    async function handleLogout() {
        const response = await deleteAccessToken();
        console.log("delete response", response)
        if (response.statusCode === 200){
            clearAuthToken();
            router.push("/login")
        }
    }

    return(
        <>
            <Button type={"submit"} onClick={handleLogout} color="primary">
                Logout
            </Button>
        </>
    );
}