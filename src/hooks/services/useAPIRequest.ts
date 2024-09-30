import axios, { AxiosError, Method } from "axios";
import { useRef } from "react";

type RequestType = (method: Method, baseURL: string, url: string, data?: any) => Promise<IResponse>;

export interface IResponse {
    status: number;
    message: string;
    data?: any;
}

const useAPIRequest = <T>(): RequestType => {
    const abortRequest = useRef(new AbortController());

    async function request(
        method: Method,
        baseURL: string,
        url: string,
        data?: T
    ): Promise<IResponse> {
        const token = localStorage.getItem("userToken");
        // abortRequest.current.abort();
        try {
            const response = await axios({
                method: method,
                baseURL: baseURL,
                url: url,
                data: data,
                signal: abortRequest.current.signal,
                withCredentials: true, // set this if you want cookies
                headers: { Authorization: token ? `Bearer ${token}` : null },
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorData = axiosError.response?.data as IResponse;
            return errorData;
        }
    }

    return request;
};

export default useAPIRequest;
