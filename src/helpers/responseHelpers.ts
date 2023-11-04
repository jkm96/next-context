import {NextResponse} from "next/server";
import {AxiosError, AxiosResponse} from "axios";
import {AdminApiErrorResponse} from "@/interfaces/shared/AdminApiInterface";
import camelcaseKeys from 'camelcase-keys';

export function handleAxiosResponse(response: AxiosResponse<any>) {
    if (response.status === 200) {
        const createResponse = response.data;
        return NextResponse.json(createResponse);
    } else {
        return NextResponse.json(response.data);
    }
}

export function handleApiException(error:any) {
    if (error instanceof AxiosError) {
        // Handle Axios errors
        const axiosError = error as AxiosError;
        console.log("error response", axiosError.response);
        console.log("error response data", axiosError.response?.data);
        console.log("error response status", axiosError.response?.status);
        const errorData:any = axiosError.response?.data;
        const errorResponse = camelcaseKeys(errorData, { deep: true }) as AdminApiErrorResponse;

        console.log("error res", errorResponse)
        return NextResponse.json(
            errorResponse,
            {status: 500}
        );
    }

    return new NextResponse(
        JSON.stringify(
            {
                "message": "An unhandled error occurred"
            }),
        {
            status: 400,
        }
    );
}