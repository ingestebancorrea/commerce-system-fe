import { useState } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '../api/axiosInstance';
import { useAlerts } from './useAlerts';
import { ApiResponse } from '../interfaces/api/api.interfaces';


export const useAxiosPost = <T extends ApiResponse>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const { handleClickAlert } = useAlerts();

    const postData = async (url: string, body?: object) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post<T>(url, body);
            setData(response.data);
            handleClickAlert({
                message: response.data.message,
                options: {
                    variant: 'success',
                },
            });
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                console.log(`Status: ${error.response.status}`);
                console.log(`Message: ${error.response.data.msg}`);
                handleClickAlert({
                    message: error.response.data.message,
                    options: {
                        variant: 'error',
                    },
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        data,
        setData,
        postData,
    };
};
