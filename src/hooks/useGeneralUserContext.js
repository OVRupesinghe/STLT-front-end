import {useContext} from 'react';
import GeneralUserContext from '../context/GeneralUserContext';

const useGeneralUserContext = () => {
    return useContext(GeneralUserContext);
}
export default useGeneralUserContext;