import logo from './logo.svg';
import './App.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import { ChakraProvider } from '@chakra-ui/react'

//pages import
import Login from './pages/Login';
import Board from './pages/Board'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Register from './pages/Login'
import Friends from './pages/Friends';
import FindFriends from './pages/FindFriends';
import ReceivedRequests from './pages/ReceivedRequests'
import SentRequests from './pages/SentRequests';
import UserPage from './pages/UserPage';
import Login2 from './pages/Login2';

function App() {

  

  return (
    <div className='container is-max-desktop'>
    <Router>

    <Nav/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/login2' element={<Login2/>} />
        <Route path='/' element={<Board/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/friends' element={<Friends/>} />
        <Route path='/friends/find' element={<FindFriends/>} />
        <Route path='/friends/sent' element={<SentRequests/>} />
        <Route path='/friends/received' element={<ReceivedRequests/>} />
        <Route path='/users/:userId' element={<UserPage/>}/>
      </Routes>
    </Router>
    <ToastContainer position="bottom-left" theme='colored' />
    </div>
  );
}

export default App;
