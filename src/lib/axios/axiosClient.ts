import axios from "axios";
import * as https from "https";
import {adminApiBaseUrl} from "@/constants/appConstants";

const adminApiClient = axios.create({
    baseURL: `${adminApiBaseUrl}`,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

adminApiClient.interceptors.request.use(
    function (config) {
        console.log("axios interceptor",config.url)
        console.log("axios request headers",config.headers)

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);
export default adminApiClient;