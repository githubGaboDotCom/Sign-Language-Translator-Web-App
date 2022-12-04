import './ForgotPassword.css';
import { Link, useNavigate} from 'react-router-dom';
import { useState} from 'react';
import axios from 'axios';

const ResetPassword = () => {

    const [inputs, setInputs] = useState({
        email: "",
    });
    const navigateToPage = useNavigate();
    const [err, setError] = useState("");

    const receiveInputChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/api/forgotPassword", inputs);
            navigateToPage("/SignIn");
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className="resetPasswordContainer">
            <video src="/videos/HomePageSLT.mp4" autoPlay loop muted />
            <div className="resetPassword_Box_Container">
                <div className="resetPassword_Box">
                    <h3 className="resetPassword_Title">Forgot your password?</h3>
                    <form action="#">
                        <h4 className="resetPassword_h4">Enter your account email to have a password reset link emailed to you.</h4>
                        <hr />
                        <div className="resetPasswordInput_Field">
                            <input className="reset_email" type="email" placeholder="Account Email" name="email" onChange={receiveInputChange} required />
                        </div>
                        <div className="resetPasswordInput_Field" id="remove_paddingBottom">
                            <input type="submit" value="SUBMIT" className="resetPassword_Button" onClick={handleSubmit} />
                        </div>
                        {err && <p className='error'>{err}</p>}
                        <p className="paragPaddingTop">Already have an account? <Link to="/SignIn" className="Already_withAccount" ><u>Login here</u></Link></p>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default ResetPassword;