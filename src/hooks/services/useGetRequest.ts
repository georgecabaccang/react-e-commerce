import axios, { AxiosError } from "axios";

const useGetRequest = () => {
    return async (url: string) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    };
};

export default useGetRequest;
