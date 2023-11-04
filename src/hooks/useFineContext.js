import {useContext} from 'react';
import userFinesContext from '../context/userFinesContext';

const useFineContext = () => {
    return useContext( userFinesContext);
}

export default useFineContext;