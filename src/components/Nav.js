import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { toast } from 'react-toastify'
import { FaRegAddressCard, FaComments,  FaUser, FaSignOutAlt, FaUserFriends,  FaArrowAltCircleLeft, FaArrowAltCircleRight, FaAddressBook} from 'react-icons/fa'
import 'bulma/css/bulma.min.css';
import { Navbar, } from 'react-bulma-components';
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
        <Navbar fixed='top' id='nav' color='danger'>
            <Navbar.Brand id='logo' display='flex' alignItems='center' justifyContent='left'>
            <Link to={'/'}>
            <Navbar.Item href="#">
              <Title id='logo-text' isSize={3} >sweetnook</Title>
              
              
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
                    <strong>&nbsp; PostsBoard</strong>
                </Link>

                

                <div className="navbar-item has-dropdown is-boxed is-hoverable">
                    <a class="navbar-link">
                    <FaUserFriends/> <strong>&nbsp;Friends</strong>
                    </a>
                    <div class="navbar-dropdown is-boxed">
                    <Link to="/friends" class="navbar-item">
                        <FaUserFriends/>&nbsp;My friends
                    </Link>
                    <hr class="navbar-divider"/>
                    <Link to="/friends/received" class="navbar-item">
                        <FaArrowAltCircleLeft/>&nbsp;Received requests
                    </Link>
                    <Link to="/friends/sent" class="navbar-item">
                        <FaArrowAltCircleRight/>&nbsp;Sent requests
                    </Link>
                    <hr class="navbar-divider"/>
                    <Link to={'/friends/find'} class="navbar-item">
                        <FaAddressBook/>&nbsp;Find friends
                    </Link>
                    
                    
                    
                    </div>
                </div>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                      
                </div>
                <div class="navbar-item">
                      
                </div>

                <div class="navbar-item has-dropdown is-hoverable is-boxed " >
                    <a class="navbar-link">
                    <FaUser/> <strong>&nbsp;{userName}</strong>
                    </a>

                    <div class="navbar-dropdown is-boxed">
                    <Link to="/profile" class="navbar-item">
                    <FaRegAddressCard/>&nbsp;My profile
                    </Link>
                    
                    
                    <hr class="navbar-divider"/>
                    <a class="navbar-item" onClick={logout}> 
                    <FaSignOutAlt title='logout' cursor='pointer'  />&nbsp;Logout
                    </a>
                    </div>
                </div>
                      
                </div>

            </div>
            </Navbar>
    )
}

export default Nav