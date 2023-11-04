import axios from '../api/posts';
import useAuth from './useAuth';
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
     
    const refresh = async () =>{
        const response = await axios.get('auth/refresh',{
            withCredentials: true
        });
        const token = response.data.accessToken;
        const decoded = jwt_decode(token);
        setAuth(prev=>{
            return {
                ...prev,
                role: response.data.userrole,
                user: response.data.username,
                fname : response.data.fname,
                user_id : decoded.userid,
                accessToken:response.data.accessToken}
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
