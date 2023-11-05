import axios from '../api/posts';
import useAuth from './useAuth';
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
     
    const refresh = async () =>{
        const response = await axios.get('refresh',{
            withCredentials: true
        });
        const token = response.data.accessToken;
        const decoded = jwt_decode(token);
        console.log(decoded);
        setAuth(prev=>{
            return {
                ...prev,
                role: decoded.userrole,
                phone: decoded.phone,
                accessToken:response.data.accessToken}
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
