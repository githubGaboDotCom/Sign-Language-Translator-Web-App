import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    });

    const passwordRef = useRef();
    const confirmPassword = useRef();

    const [err, setError] = useState("");
    const navigateToPage = useNavigate();

    const receiveInputChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPassword.current.value) {
            return setError("Error: Passwords do not match!");
        }

        try{
            await axios.post("http://localhost:8000/api/SignUp", inputs);
            navigateToPage("/SignIn");
        }catch(err){
            setError(err.response.data)
        }
    }
  
    return (
        <div className="signup_container">
            <video src="/videos/SignUpPageSLT.mp4" autoPlay loop muted />
            <div className="Sign_Up_Box_Container">
                <div className="Sign_Up_Box">
                    <h3 className="SignUp_Title">Sign Up</h3>
                    <form action="#">
                        <h4 className="SignUp_h4">Please fill in this form to create an account!</h4>
                        <hr />
                        <div className="Input_Field">
                            <input className="First_Name" type="text" placeholder="First Name" name="firstname" onChange={receiveInputChange} required />
                        </div>
                        <div className="Input_Field">
                            <input type="text" placeholder="Last Name" name="lastname" onChange={receiveInputChange} required />
                        </div>
                        <div className="Input_Field">
                            <input type="email" placeholder="Email" name="email" onChange={receiveInputChange} required />
                        </div>
                        <div className="Input_Field">
                            <input type="text" placeholder="Username" name="username" maxlength="10" onChange={receiveInputChange} required />
                        </div>
                        <div className="Input_Field">
                            <input type="password" placeholder="Password" name="password" ref={passwordRef} onChange={receiveInputChange} required />
                        </div>
                        <div class="Input_Field">
                            <input type="password" placeholder="Confirm Password" ref={confirmPassword} required />
                        </div>
                        <div className="Input_Field" id="remove_paddingBottom">
                            <input type="submit" value="SIGN UP" className="SignUp_Button" onClick={handleSubmit} />
                        </div>
                        {err && <p className='error'>{err}</p>}
                        <p className="paragPaddingTop">Already have an account? <Link to="/SignIn" className="Already_withAccount" ><u>Login here</u></Link></p>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default SignUp;

