import axios, { AxiosError } from "axios";

const useAPIRequest = () => {
    return async <T>(method: string, baseURL: string, url: string, data?: T) => {
        try {
            const response = await axios({
                method: method,
                baseURL: baseURL,
                url: url,
                data: data,
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    };
};

export default useAPIRequest;
