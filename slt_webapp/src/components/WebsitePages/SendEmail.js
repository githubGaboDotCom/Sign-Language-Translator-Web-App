import './SendEmail.css';
import { ReactContextAPI } from '../../ReactContextAPI';
import { Navigate} from 'react-router-dom';
import { useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const SendEmail = () => {
    const {currentUser} = useContext(ReactContextAPI);
    const [err, setError] = useState("");
    const [inputs, setInputs] = useState({
        username: "",
        messagetitle: "",
        message: "",
    });

    const receiveInputChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/api/SendEmail", inputs);
            window.location.reload();
        }catch(err){
            setError(err.response.data)
        }
    }

    if (!currentUser) {
        return <Navigate replace to="/SignIn" />
    }else {
        return (
            <div className="sendEmail_container">
                <video src="/videos/AboutPageSLT.mp4" autoPlay loop muted />
                <div className="sendEmail_Box_Container">
                    <div className="sendEmail_Box">
                        <h3 className="sendEmail_Title">Send an Email</h3>
                        <form action="#">
                            <h4 className="sendEmail_h4">Contact your friends anytime. You will only need to provide their username, and your message will arrive right away!</h4>
                            <hr />
                            <div className="Input_Field">
                                <input className="sendEmailUsername" type="text" placeholder="Provide a username" name="username" onChange={receiveInputChange} required />
                            </div>
                            <div className="Input_Field">
                                <input type="text" placeholder="Message Title" name="messagetitle" onChange={receiveInputChange} required />
                            </div>
                            <div className="Input_Field">
                                <textarea id="sendEmailMessage" placeholder="Enter your message here" name="message" cols="50" rows="5" onChange={receiveInputChange} required></textarea>
                            </div>
                            <div className="Input_Field" id="sendEmailremove_paddingBottom">
                                <input type="submit" value="SUBMIT" className="sendEmail_Button" onClick={handleSubmit} />
                            </div>
                            {err && <p className='error'>{err}</p>}
                        </form>
                        <div className="sendEmail_pageButtons">
                            <Link to="/RecordVideo">
                                <button className="sendEmail_toRecordPage">RECORD A VIDEO</button>
                            </Link>
                            <Link to="/UserSession">
                                <button className="sendEmail_toPageUserSession">GO TO DETECTION PAGE</button>
                             </Link>
                            <Link to="/LearnSignLanguage">
                                <button className="sendEmail_learnSignLanguage">LEARN SIGN LANGUAGE</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    
}

export default SendEmail;