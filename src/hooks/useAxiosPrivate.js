import {axiosPrivate} from "../api/posts"
import {useEffect} from "react"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use( 
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },(error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true; //create a flag to avoid infinite loop
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept); //clean up
            axiosPrivate.interceptors.response.eject(responseIntercept); //clean up
        }
    },[auth,refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;