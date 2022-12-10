import './LearnSignLanguage.css';
import { ReactContextAPI } from '../../ReactContextAPI';
import { Navigate } from 'react-router-dom';
import { useContext, useState} from 'react';
import { ImageSlider } from './Utilities/ImageSlider';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const LearnSignLanguage = ({imageSlides}) => {
    const {currentUser} = useContext(ReactContextAPI);
    const [current, setCurrent] = useState(0);
    const length = imageSlides.length;

    const nextImage = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const previousImage = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    if (!currentUser) {
        return <Navigate replace to="/SignIn" />
    }else {
        return (
            <div className="learnSignLanguage_container">
                <video src="/videos/AboutPageSLT.mp4" autoPlay loop muted />
                <div className="learnSignLanguage_Box_Container">
                    <div className="learnSignLanguage_Box">
                        <FaArrowAltCircleLeft className='leftArrow' onClick={previousImage} />
                        <FaArrowAltCircleRight className='rightArrow' onClick={nextImage} />
                        {ImageSlider.map((slide, index) => {
                            return (
                                <div className={index === current ? "slideActive" : "slide"} key={index}>
                                    {index === current && (
                                        <div className='imageContainer'>
                                            <img src={slide.image} className='sltImage' alt='Text'/>
                                            <p className='imageTextLS'>{slide.text}</p>
                                        </div>
                                    )}
                                </div>)})
                        }  
                    </div>
                </div>
            </div>
        );
    }
}

export default LearnSignLanguage;