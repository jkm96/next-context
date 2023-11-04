import {NextResponse} from "next/server";
import {StoreTokenRequest} from "@/interfaces/token/tokenInterface";
import {apiKey, internalBaseUrl} from "@/constants/appConstants";

export async function storeAccessToken(storeTokenRequest: StoreTokenRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/token/store`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(storeTokenRequest),
            credentials: 'same-origin'
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getAccessToken(tokenCookie: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/token/retrieve`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(tokenCookie),
            credentials: 'same-origin'
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
