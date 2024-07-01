import axios, { AxiosError } from "axios";

const useAPIRequest = () => {
    let abortController: AbortController = new AbortController();

    const abort = () => {
        abortController.abort();
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
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    };

    return { request, abort };
};

export default useAPIRequest;
