import {createContext, useState, useEffect} from "react" ;
import { useForm } from 'react-hook-form';


const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const title = {
        0: "Sign up to SriCare",
        1: "Set up a password",
        2: "Enter contact details",
        3: "Congratulations"
    }

   

    const [page, setPage] = useState(0); //keep track of the page
    const form = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors } = formState;
    const [videoUrl, setVideoUrl] = useState('');
    const [videoDuration , setVideoDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [videoFile, setVideoFile] = useState(null); 
    const [videoDimensions, setVideoDimensions] = useState({width: 0, height: 0});
    const [trimmedVideo, setTrimmedVideo] = useState(null); 
    const [videoThumbnail, setVideoThumbnail] = useState(null); 

    return (
        <FormContext.Provider value={{videoThumbnail, setVideoThumbnail, trimmedVideo, setTrimmedVideo,videoFile, setVideoFile,startTime, setStartTime,videoUrl,endTime, setEndTime, setVideoUrl, title, page, setPage, form, register, control, handleSubmit,errors, watch, getValues, setValue, videoDuration , setVideoDuration,videoDimensions, setVideoDimensions }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;