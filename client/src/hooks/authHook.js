import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../store/actions/auth";
import {useRequest} from "./requestHook";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {request, error} = useRequest();
    const [isLoading, setIsLoading] = useState(true);
    const asyncCallback = async () => {
        try {
            const response = await request('/api/auth/refresh', 'POST');
            if (!error && response.newAccessToken) {
                dispatch(login(response.newAccessToken));
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        asyncCallback();


    },[]);
    return isLoading;
}