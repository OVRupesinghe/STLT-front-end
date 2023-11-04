import {createContext, useState, useEffect} from "react" ;

const userDetailsContext = createContext({});

export const DetailsProvider = ({children}) => {

    const [LicenseDetails, setLicenseDetails] = useState({
        status: " ",
        demeritPoints: " ",
        licenseNumber: " ",
        dateOfIssue: " ",
        dateOfExpiry: " ",
        vehicleClass: " ",
        restrictions: " " 
    }); 

    const [personalDetails, setPersonalDetails] = useState({
        fullName: " ",
        age: " ",
        address: " ",
        contactNumber: " ",
        nic: ""
    });

    const [previousOffences, setPreviousOffences] = useState({}); 

    return (
        <userDetailsContext.Provider value={{ LicenseDetails,setLicenseDetails, personalDetails, setPersonalDetails, previousOffences, setPreviousOffences }}>
            {children}
        </userDetailsContext.Provider>
    )
}

export default userDetailsContext;

