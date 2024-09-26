import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { openModal } from "../../store/modalStore/modalSlice";
import { useDispatch } from "react-redux";

type Method = "get" | "post" | "put" | "patch" | "delete";

export interface IRequestConfig<T> {
    method: Method;
    baseURL: string;
    url: string;
    data?: T;
}

interface IResponse {
    status: number;
    message: string;
    data: any;
}

interface IResponseError {
    status: number;
    message: string;
}

const useAPIRequest = <T>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [config, setConfig] = useState<IRequestConfig<T> | null>(null);
    const [returnData, setReturnData] = useState<IResponse | null>(null);
    const [requestError, setRequestError] = useState<IResponseError | null>(null);

    const dispatch = useDispatch();

    const abortControllerRef = useRef(new AbortController());

    const token = localStorage.getItem("userToken");

    const makeRequest = (method: Method, baseURL: string, url: string, data?: T) => {
        setIsLoading(true);
        setConfig({
            method,
            baseURL,
            url,
            data,
        });
    };

    useEffect(() => {
        if (!isLoading) return;
        request();
        async function request() {
            if (!config) return;
            setRequestError(null);
            try {
                abortControllerRef.current.abort();
                abortControllerRef.current = new AbortController();

                const response = await axios({
                    method: config.method,
                    baseURL: config.baseURL,
                    url: config.url,
                    data: config.data,
                    signal: abortControllerRef.current.signal,
                    withCredentials: true, // set this if you want cookies
                    headers: { Authorization: token ? `Bearer ${token}` : null },
                });
                setReturnData(response.data);
            } catch (error) {
                abortControllerRef.current.abort();
                if (error instanceof AxiosError) {
                    if (error.response?.data === "expired_token") {
                        dispatch(openModal());
                    }
                    const errorData: IResponseError = error.response?.data;
                    if (!errorData) return;
                    setRequestError({ status: errorData.status, message: errorData.message });
                }
            } finally {
                setIsLoading(false);
            }
        }

        return () => abortControllerRef.current.abort();
    }, [config, isLoading]);

    return { request: makeRequest, isLoading, data: returnData, requestError };
};

export default useAPIRequest;
