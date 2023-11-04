import adminApiClient from "@/libs/adminApiAxios/adminApiClient";
import {NextRequest} from "next/server";
import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        const response = await adminApiClient
            .post('auth/register', `${requestBody}`);
console.log("register response", response)
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}
