import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './ResetPassword.css';
import axios from 'axios';

const ResetPassword = () => {

    const [inputs, setInputs] = useState({
        password: "",
    });
    const urlParameters = useParams();
    const navigateToPage = useNavigate();
    const [error, setError] = useState("");
    const passwordRef = useRef();
    const confirmPassword = useRef();

    async function isResetEmailValid () {
        try{
            await axios.post("http://localhost:8000/api/ResetPassword", urlParameters);
        }catch(err){
            alert("Error: Reset link is invalid!");
            navigateToPage("/SignIn");
        }
    }

    useEffect(() => {
        isResetEmailValid ();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const receiveInputChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPassword.current.value) {
            return setError("Error: Passwords do not match!");
        }

        try{
            await axios.post("http://localhost:8000/api/changePassword", [inputs, urlParameters]);
            navigateToPage("/SignIn");
        }catch(err){
            setError(err.response.data)
        }
    }


    return (
        <div className="newPassword_container">
            <video src="/videos/HomePageSLT.mp4" autoPlay loop muted />
            <div className="newPassword_Box_Container">
                <div className="newPassword_Box">
                    <h3 className="newPassword_Title">Password Reset</h3>
                    <form action="#">
                        <hr />
                        <div className="newPasswordInput_Field">
                            <input className="newPassword" type="password" placeholder="New Password" name="password" ref={passwordRef} onChange={receiveInputChange} required />
                        </div>
                        <div className="newPasswordInput_Field">
                            <input className="newPassword" type="password" placeholder="Confirm Password" name="password" ref={confirmPassword} required />
                        </div>
                        <div className="newresetPasswordInput_Field" id="newremove_paddingBottom">
                            <input type="submit" value="RESET" className="newresetPassword_Button" onClick={handleSubmit} />
                        </div>
                        {error && <p className='newerror'>{error}</p>}
                    </form>

                </div>

            </div>
        </div>
    );
}

export default ResetPassword;