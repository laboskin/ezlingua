import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../store/actions/auth";
import {useRequest} from "./requestHook";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const [isLoading, setIsLoading] = useState(true);
    const asyncCallback = useCallback(async () => {
        try {
            const response = await request('/api/auth/refresh', 'POST');
            if (response?.newAccessToken) {
                dispatch(login(response.newAccessToken));
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }, [dispatch, request]);
    useEffect(() => {
        asyncCallback();
    },[asyncCallback]);
    return isLoading;
}