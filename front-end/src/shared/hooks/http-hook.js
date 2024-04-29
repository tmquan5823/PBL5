import { useState, useCallback, useRef, useEffect } from 'react';

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
            const test = {
                "email": "vvt14102003@gmail.com",
                "password": "14102003"
            };
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body,
                    // signal: httpAbortCtrl.signal
                });
                const responseData = await response.json();

                // activeHttpRequests.current = activeHttpRequests.current.filter(
                //     reqCtrl => reqCtrl !== httpAbortCtrl
                // );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                console.log(responseData);
                return responseData;
            } catch (err) {
                console.log(err);
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
