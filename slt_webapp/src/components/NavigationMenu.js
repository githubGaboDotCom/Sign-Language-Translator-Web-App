import './NavigationMenu.css';
import {Link} from 'react-router-dom';
import React, { useContext } from 'react';
import { ReactContextAPI } from '../ReactContextAPI';

const NavigationMenu = () => {

    const {currentUser, logout} = useContext(ReactContextAPI);

    return (
        <nav className="navigation_menu">
            <input type="checkbox" className="check" />
            <label htmlFor="check" className="check_button_menu">
                <i className="fa fa-bars"></i>
            </label>
            <label className="App_Logo">SLT Website</label>
            <ul className="nav_menu_ul">
                <li className="nav_menu_ul_li">
                    <Link to="/" className="nav_menu_links">HOME</Link>
                </li>
                <li className="nav_menu_ul_li">
                    <Link to="/Instructions" className="nav_menu_links">INSTRUCTIONS</Link>
                </li>
                <li className="nav_menu_ul_li">
                    <Link to="/About" className="nav_menu_links">ABOUT</Link>
                </li>
                {currentUser ? (
                    <React.Fragment>
                    <li className="nav_menu_ul_li">
                        <Link className="nav_menu_username" id="paddingfifteenpx">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav_menu_ul_li" id="straight_line"> | </li>
                    <li className="nav_menu_ul_li">
                        <Link to="/" id="paddingfifteenpx" className="nav_menu_links" onClick={logout}>
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            LOG OUT
                        </Link>
                    </li>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <li className="nav_menu_ul_li">
                        <Link to="/SignIn" id="paddingfifteenpx" className="nav_menu_links">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            SIGN IN
                        </Link>
                    </li>
                    <li className="nav_menu_ul_li" id="straight_line"> | </li>
                    <li className="nav_menu_ul_li">
                        <Link to="/SignUp" id="paddingfifteenpx" className="nav_menu_links">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            SIGN UP
                        </Link>
                    </li>
                    </React.Fragment>
                )}   
            </ul>
        </nav>
    );
}

export default NavigationMenu;

// function NavBarLink ({to, children, ...props}) {
//     const resolvedPath = useResolvedPath(to);
//     const webPageActive = useMatch({path: resolvedPath.pathname, end: true});
//     return (
//         <Link to={to} {...props} style={webPageActive ? "background-color: red;" : ""}>
//             {children}
//         </Link>
//     );
// }

