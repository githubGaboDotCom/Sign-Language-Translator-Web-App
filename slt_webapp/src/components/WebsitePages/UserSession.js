import './UserSession.css';
import { useContext, useRef, useEffect } from 'react';
import { ReactContextAPI } from '../../ReactContextAPI';
import { Navigate } from 'react-router-dom';
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import {Link} from 'react-router-dom';
import {drawRectangle} from './Utilities/utilities.js';

const UserSession = () => {
    const {currentUser} = useContext(ReactContextAPI);
    const myWebCamRef = useRef(null);
    const canvasRef = useRef(null);
    const loadTSJmodel = async () => {
        const model = await tf.loadGraphModel("http://localhost:8000/api/tsjMyModel/model.json");
        
        setInterval(() => {
            detect(model);
        }, 16.7);
    }

    const detect = async (model) => {
        if ( typeof myWebCamRef.current !== "undefined" && myWebCamRef.current != null && myWebCamRef.current.video.readyState === 4) {

            const video = myWebCamRef.current.video;
            const videoWidth = myWebCamRef.current.video.videoWidth;
            const videoHeight = myWebCamRef.current.video.videoHeight;

            myWebCamRef.current.video.width = videoWidth;
            myWebCamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const videoImage = tf.browser.fromPixels(video);
            const resizedImage = tf.image.resizeBilinear(videoImage, [640, 480]);
            const casted = resizedImage.cast("int32");
            const expanded = casted.expandDims(0);
            const modelObject = await model.executeAsync(expanded);
            console.log(modelObject);

            const boxes = await modelObject[1].array();
            //console.log(boxes);
            const classes = await modelObject[2].array();
            //console.log(classes);
            const scores = await modelObject[4].array();
            // console.log(scores);

            const ctx = canvasRef.current.getContext("2d");
            // const [y,x,height,width] = boxes[0];
            
            // modelObject.forEach(() => {
            //     console.log("Receving input!")
            //     ctx.beginPath();
            //     ctx.strokeStyle = "blue";
            //     ctx.lineWidth = 5;
            //     ctx.fillStyle = 'white';
            //     ctx.rect(30, 30, 50, 50);
            //     // ctx.rect(x * videoWidth, y * videoHeight, 50 * width / 2, 50 * height / 1.5);
            //     ctx.stroke();

            // });
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.fillStyle = 'white';
            ctx.rect(30, 30, 50, 50);
            ctx.stroke();

            // requestAnimationFrame(()=>{drawRectangle(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)});

            tf.dispose(videoImage);
            tf.dispose(resizedImage);
            tf.dispose(expanded);
            tf.dispose(casted);
            tf.dispose(modelObject);
        }
    };

    useEffect(() => {
        loadTSJmodel();
        // eslint-disable-next-line
    }, [])

    if (!currentUser) {
        return <Navigate replace to="/SignIn" />
    }else {
        return (
            <div className="usersession_container">
                <video className="backgroundVideo" src="/videos/HomePageSLT.mp4" autoPlay loop muted />
                <Webcam ref={myWebCamRef} className="webcamStyle"/>
                <canvas ref={canvasRef} className="canvasStyle" />
                <div className="pageButtons">
                    <Link to="/RecordVideo">
                        <button className="toRecordPage">RECORD A VIDEO</button>
                    </Link>
                    <Link to="/SendEmail">
                        <button className="sendEmail">SEND AN EMAIL</button>
                    </Link>
                    <Link to="/LearnSignLanguage">
                        <button className="learnSignLanguage">LEARN SIGN LANGUAGE</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default UserSession;

