import {useContext} from 'react';
import userDetailsContext from '../context/userDetailsContext';

const useDetailsContext = () => {
    return useContext( userDetailsContext);
}

export default useDetailsContext;