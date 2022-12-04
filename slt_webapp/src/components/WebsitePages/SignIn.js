import './SignIn.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactContextAPI } from '../../ReactContextAPI';
import { Link } from 'react-router-dom';

const SignIn = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setError] = useState("");
    const navigateToPage = useNavigate();
    const {login} = useContext(ReactContextAPI);

    const receiveInputChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await login(inputs);
            navigateToPage("/UserSession");
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className="signin_container">
            <video src="/videos/SignInPageSLT.mp4" autoPlay loop muted />
        
            <div className="Login_Box_Container">
                <div className="Login_Box">
                    <h3>Login Here</h3>
                    <form action="#">
                        <div className="Input_Field">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input type="text" placeholder="Username" name="username" onChange={receiveInputChange} required /> 
                        </div>
                        <div className="Input_Field" id="Password_Id">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="Password" name="password" onChange={receiveInputChange} required />
                        </div>
                        {err && <p className='error'>{err}</p>}
                        <div className="Input_Field">
                            <div className="Forgot_Password">
                                <Link id="Forgot" to="/ForgotPassword">Forgot password?</Link>
                            </div>
                            <input type="submit" value="LOGIN" className="Login_Button" onClick={handleSubmit} />
                        </div>
                        <p className="dontHaveAccount">Don't have an account? <Link to="/SignUp" style={{color: "white"}}><u>Sign up here</u></Link></p>
                    </form>
                </div>
            </div>

            <div className="Login_Icon_Container">
                <i className="fa fa-sign-in" aria-hidden="true" id="Login_Icon"></i>
            </div>
        </div>
    );
}

export default SignIn;