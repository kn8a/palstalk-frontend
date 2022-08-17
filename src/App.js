import logo from './logo.svg';
import './App.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

//pages import
import Login from './pages/Login';
import Board from './pages/Board'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Register from './pages/Login'


function App() {

  

  return (
    <div className='container is-max-desktop'>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Board/>} />
      </Routes>
    </Router>
    <ToastContainer/>
    </div>
  );
}

export default App;
