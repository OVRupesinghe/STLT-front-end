import {createContext, useState, useEffect} from "react" ;

const userFinesContext = createContext({});

export const FineProvider = ({children}) => {

    const [spotFines, setSpotFines] = useState({}); 
    const [uploadData, setUploadData] = useState({});
    const [videoFines, setVideoFines] = useState({});
    const [acceptedUploads, setAcceptedUploads] = useState([]);
    const [rejectedUploads, setRejectedUploads] = useState([]);
    const [pendingUploads, setPendingUploads] = useState([]);


    return (
        <userFinesContext.Provider value={{ spotFines, setSpotFines, uploadData, setUploadData, videoFines, setVideoFines, acceptedUploads, setAcceptedUploads, rejectedUploads, setRejectedUploads, pendingUploads, setPendingUploads }}>
            {children}
        </userFinesContext.Provider>
    )
}

export default userFinesContext;
