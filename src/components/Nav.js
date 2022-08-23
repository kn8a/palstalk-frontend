import React, { useState } from 'react'
import {
    Link, useNavigate
  } from 'react-router-dom' 
import { toast } from 'react-toastify'
import {FaCommentAlt, FaThumbsDown, FaComments, FaClipboardList, FaThumbsUp, FaRegCommentAlt, FaUser, FaSignOutAlt, FaUserFriends, FaUserAlt} from 'react-icons/fa'
import 'bulma/css/bulma.min.css';
import { Navbar, Button, Heading } from 'react-bulma-components';
import { Content } from 'bloomer/lib/elements/Content';
import { Title } from 'bloomer';


function Nav(props) {

  const navigate = useNavigate()
  const userName = localStorage.getItem('palstalkUserName')

  const logout = () => {
    localStorage.removeItem('palstalkToken')
    localStorage.removeItem('palstalkUserId')
    localStorage.removeItem('palstalkUserPic')
    localStorage.removeItem('palstalkUserName')
    toast.success('Logged out successfully')
    navigate('/login')
}
  

    const [burgerActive, setBurgerActive] = useState(false)


    if (!userName) {
      return(<div></div>)
    }

    return (
        <Navbar fixed='top' id='nav' color='info'>
            <Navbar.Brand id='logo'>
            <Link to={'/'}>
            <Navbar.Item href="#">
              <Title id='logo-text' isSize={3} >palstalk</Title>
              
              
            </Navbar.Item>
            </Link>
            

                <a role="button" className={`navbar-burger ${burgerActive? "is-active": ""}`} 
                    aria-label="menu" aria-expanded="false" 
                    data-target="navMain"
                    onClick={() => setBurgerActive(!burgerActive)}
                >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </Navbar.Brand>

            <div id="navMain" className={`navbar-menu ${burgerActive? "is-active": ""}`}>
                <div class="navbar-start">
                <Link to="/" class="navbar-item">
                    <FaComments/>
                    &nbsp;Board
                </Link>

                

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    <FaUserFriends/> <strong>&nbsp;Friends</strong>
                    </a>
                    <div class="navbar-dropdown">
                    <Link to="/friends" class="navbar-item">
                        My friends
                    </Link>
                    <hr class="navbar-divider"/>
                    <Link to="/about" class="navbar-item">
                        Received requests
                    </Link>
                    <Link to="/about" class="navbar-item">
                        Sent requests
                    </Link>
                    <hr class="navbar-divider"/>
                    <a class="navbar-item">
                        Find friends
                    </a>
                    
                    
                    
                    </div>
                </div>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                      
                </div>
                <div class="navbar-item">
                      
                </div>
                <div class="navbar-item">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    <FaUser/> <strong>&nbsp;{userName}</strong>
                    </a>

                    <div class="navbar-dropdown">
                    <Link to="/about" class="navbar-item">
                    &nbsp;My profile
                    </Link>
                    
                    
                    <hr class="navbar-divider"/>
                    <a class="navbar-item" onClick={logout}> 
                    <FaSignOutAlt title='logout' cursor='pointer'  />&nbsp;Logout
                    </a>
                    </div>
                </div>
                      
                </div>
                </div>
            </div>
            </Navbar>
    )
}

export default Nav