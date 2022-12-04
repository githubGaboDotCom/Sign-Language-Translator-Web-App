import './UserSession.css';
import { useContext } from 'react';
import { ReactContextAPI } from '../../ReactContextAPI';
import { Navigate } from 'react-router-dom';

const UserSession = () => {
    const {currentUser} = useContext(ReactContextAPI);

    if (!currentUser) {
        return <Navigate replace to="/SignIn" />
    }else {
        return (
            <div className="usersession_container">
                <video src="/videos/HomePageSLT.mp4" autoPlay loop muted />
            </div>
        );
    }
}

export default UserSession;