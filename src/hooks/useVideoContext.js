import {useContext} from 'react';
import VideoContext from '../context/VideoContext';

const useVideoContext = () => {
    return useContext(VideoContext);
}
export default useVideoContext;
