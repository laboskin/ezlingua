import {useState, useCallback} from 'react';
import {useSelector} from "react-redux";

export const useRequest = (withAuth = false) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useSelector(state => state.auth);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        try {
            if (body) {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(body);
            }

            if (withAuth && auth.isAuthenticated) {
                headers['Authorization'] = `Bearer ${auth.token}`;
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request error');
            }

            setIsLoading(false);

            return data;
        } catch (e) {
            setIsLoading(false);
            setError(e.message);
        }
    }, [])

    const deleteError = useCallback(() => setError(null), []);

    return { request, isLoading, error, deleteError };
}