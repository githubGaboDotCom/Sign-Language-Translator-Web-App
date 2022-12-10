import './RecordVideo.css';
import { ReactContextAPI } from '../../ReactContextAPI';
import {useReactMediaRecorder} from "react-media-recorder";
import { useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecordVideo = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({ video: true });
    const {currentUser} = useContext(ReactContextAPI);

    if (!currentUser) {
        return <Navigate replace to="/SignIn" />
    }else {
        return (
            <div className="recordvideo_container">
                <video className="recordvideobackgroundVideo" src="/videos/HomePageSLT.mp4" autoPlay loop muted />
                <div className='recordvideostatusTitle'>
                    <h1>{status}</h1>
                </div>
                <video src={mediaBlobUrl} controls autoPlay loop className="recordvideoStyle"/>
                <div className="recordvideopageButtons">
                    <button className="recordvideorecordingButton" onClick={startRecording}>START RECORDING</button>
                    <button className="recordvideostopButtonon" onClick={stopRecording}>STOP RECORDING</button>
                    <Link to="/UserSession">
                        <button className="toPageUserSession">GO TO DETECTION PAGE</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default RecordVideo;