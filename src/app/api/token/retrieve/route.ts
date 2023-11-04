import {NextRequest, NextResponse} from "next/server";
import {RefreshTokenRequest, StoreTokenRequest, TokenResponse} from "@/interfaces/token/tokenInterface";
import adminApiClient from "@/libs/adminApiAxios/adminApiClient";

export async function POST(request: NextRequest) {
    try {
        let tokenCookie = await request.json();
        const {accessToken, refreshToken, expiresAt} = JSON.parse(tokenCookie);

        const expirationDate = new Date(expiresAt);
        const currentDate = new Date();
        if (expirationDate > currentDate) {//token not expired
            let tokenRes = {
                accessToken: accessToken,
                expiresAt: expiresAt,
                refreshToken: refreshToken,
                storeToken: false
            };

            return NextResponse.json(tokenRes,{status:200});
        }
        else
        {
            console.log("refresh token")
            //get new access token
            const data = await refreshAccessToken(refreshToken, accessToken);
            console.log("token data", data)

            let newTokenRes: StoreTokenRequest = {
                accessToken: data.token,
                expiresAt: data.expiresAt,
                refreshToken: data.refreshToken,
                storeToken: true
            };

            return NextResponse.json(newTokenRes,{status:200});
        }
    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred storing cookie: ${e}`}, {status: 400}
        )
    }
}

async function refreshAccessToken(refreshToken: string, token: string) {
    const request: RefreshTokenRequest = {
        refreshToken: refreshToken,
        token: token
    };

    const response = await adminApiClient
        .post<TokenResponse>('auth/refresh-token', `${JSON.stringify(request)}`);
    console.log("refresh token response", response.data)

    return response.data;
}