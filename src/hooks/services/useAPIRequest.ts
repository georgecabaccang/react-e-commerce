import axios, { AxiosError } from "axios";
import { useState } from "react";

const useAPIRequest = () => {
    const [isLoading, setIsLoading] = useState(true);
    let abortController: AbortController = new AbortController();

    const abort = () => {
        abortController.abort();
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    const request = async <T>(method: string, baseURL: string, url: string, data?: T) => {
        abortController?.abort();
        abortController = new AbortController();

        try {
            const response = await axios({
                method: method,
                baseURL: baseURL,
                url: url,
                data: data,
                signal: abortController.signal,
            });
            stopLoading();
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log({ error: error.code });
            }
        }
    };

    return { request, abort, loading: isLoading, stopLoading: stopLoading };
};

export default useAPIRequest;
