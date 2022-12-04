import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';
import HomePage from './components/WebsitePages/HomePage';
import About from './components/WebsitePages/About';
import Instructions from './components/WebsitePages/Instructions';
import SignIn from './components/WebsitePages/SignIn';
import SignUp from './components/WebsitePages/SignUp';
import PageNotFound from './components/WebsitePages/PageNotFound';
import UserSession from './components/WebsitePages/UserSession';
import ForgotPassword from './components/WebsitePages/ForgotPassword';
import ResetPassword from './components/WebsitePages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <NavigationMenu />
            <div id="WebsitePages">
                <Routes>
                    <Route path="/" element = {<HomePage />} />
                    <Route path="/About" element = {<About />} />
                    <Route path="/Instructions" element = {<Instructions />} />
                    <Route path="/SignIn" element = {<SignIn />} />
                    <Route path="/SignUp" element = {<SignUp />} />
                    <Route path="/UserSession" element = {<UserSession />} />
                    <Route path="/ForgotPassword" element = {<ForgotPassword />}/>
                    <Route path="/ResetPassword/:id/:token" element = {<ResetPassword />}/>
                    <Route path="*" element = {<PageNotFound />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
