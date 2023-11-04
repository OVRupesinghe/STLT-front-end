import GeneralDetails from './GeneralDetails';
import UserCredentials from './UserCredentials';
import ContactDetails from './ContactDetails';
import FinalPage from './FinalPage';
import useFormContext from  '../../hooks/useFormContext';

export default function FormInputs() {
    const {page} = useFormContext();

    const display = {
       0: <GeneralDetails />,
       1: <UserCredentials />,
       2: <ContactDetails />,
       3: <FinalPage />
    }

    return(
        <>
            {display[page]} 
        </>
    )
}