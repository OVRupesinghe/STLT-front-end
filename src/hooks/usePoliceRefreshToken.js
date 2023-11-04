import axios from '../api/posts'
import useAuth from './useAuth'

const usePoliceRefreshToken = () => {
    const {setAuth} = useAuth();
     
    const refresh = async () =>{
        const response = await axios.get('copsco/refresh',{
            withCredentials: true
        });
        setAuth(prev=>{
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                role: response.data.userrole,
                user: response.data.username,
                accessToken:response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default usePoliceRefreshToken;