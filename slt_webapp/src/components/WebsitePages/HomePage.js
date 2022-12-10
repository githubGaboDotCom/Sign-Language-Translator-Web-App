import './HomePage.css';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage_container">
            <video src="/videos/HomePageSLT.mp4" autoPlay loop muted />
            <div className="mainTitleContainer">
                <h1>SIGN LANGUAGE IS FOR EVERYONE</h1>
            </div>
            <br/>
            <br/>
            <div className="quoteContainer">
                <p id="firstP"><i>"Sign language is the noblest gift God has given to deaf people."</i></p>
                <p id="secondP">George Veditz</p>
            </div>
            <div className="homePageButtons">
                <Link to="/SignUp">
                    <button className="homePageSignUpButton">SIGN UP</button>
                </Link>
                <br/>
                <Link to="/SignIn">
                    <button className="homePagelogInButton">LOG IN</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;