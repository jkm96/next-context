import {NextRequest, NextResponse} from "next/server";
import {getAccessToken} from "@/libs/token/tokenService";
import {StoreTokenRequest} from "@/interfaces/token/tokenInterface";
import {setCookieOnResponseHeaders} from "@/helpers/tokenHelpers";
import {apiKey, cookieName, internalBaseUrl} from "@/constants/appConstants";



export async function middleware(request: NextRequest) {
    if (request.url.includes('/api/')) {
        const clientApiKey = request.headers.get("x-api-key");
        if (clientApiKey !== apiKey) {
            return NextResponse.json("Unauthorized access");
        }
    }

    if (request.url.includes(`${internalBaseUrl}`) && !request.url.includes("login")) {
        console.log("url", request.url)
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        if (tokenCookie !== undefined){
            let tokenResponse:StoreTokenRequest = await getAccessToken(tokenCookie)

            //store new token
            if (tokenResponse.storeToken){
                let response = NextResponse.next();
                const {accessToken, expiresAt, refreshToken} = tokenResponse;

                setCookieOnResponseHeaders(accessToken,refreshToken,expiresAt, response);

                return response;
            }
        }
    }

    return NextResponse.next();
}