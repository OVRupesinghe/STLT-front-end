import {createContext, useState} from "react" ;

const GeneralUserContext = createContext({});

export const GeneralUserProvider = ({children}) => {


    const [searchKey, setSearchKey] = useState(''); //keep track of the page

    return (
        <GeneralUserContext.Provider value={{ searchKey, setSearchKey }}>
            {children}
        </GeneralUserContext.Provider>
    )
}

export default GeneralUserContext;