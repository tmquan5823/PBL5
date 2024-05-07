import { useState, useCallback, useRef, useEffect } from 'react';
import axios from "axios"

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {
            accept: 'application/json',
            'User-agent': 'Quan'
        }) => {
            setIsLoading(true);
            const config = {
                method,
                url,
                data: body,
                headers,
            };
            try {
                const response = await axios(config);
                // activeHttpRequests.current = activeHttpRequests.current.filter(
                //     reqCtrl => reqCtrl !== httpAbortCtrl
                // );
                setIsLoading(false);
                console.log(response);
                return response.data;
            } catch (err) {
                console.log("Error: " + err);
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
