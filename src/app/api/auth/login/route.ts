import adminApiClient from "@/libs/adminApiAxios/adminApiClient";
import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";

export async function POST(request: Request) {
    try {
        const requestBody = await request.text();
        const response = await adminApiClient
            .post('auth/login', `${requestBody}`);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}