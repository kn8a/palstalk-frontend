import logo from './logo.svg';
import './App.css';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Nav from './components/Nav';

//pages import
import Login from './pages/Login';
import Board from './pages/Board'
import Profile from './pages/Profile'

import Friends from './pages/Friends';
import FindFriends from './pages/FindFriends';
import ReceivedRequests from './pages/ReceivedRequests'
import SentRequests from './pages/SentRequests';
import UserPage from './pages/UserPage';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AppFooter from './components/AppFooter';
import { Hero, Container, Content, Footer, Heading } from 'react-bulma-components';
import {DiNodejsSmall, DiReact, DiMongodb, DiHtml5, DiCss3, DiJavascript1, DiGithub} from 'react-icons/di'



function App() {

  const [apiConnected, setApiConnected] = useState(false)

  useEffect (()=> {
    const pingURL = process.env.REACT_APP_API_URL + '/ping'
    axios.get(pingURL)
    .then((response) => {
      if(response.data.message == 'ok') {
        console.log('API connected')
        setApiConnected(true)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  if (!apiConnected) {
    return (<div className="is-active pageloader is-info"><span className="title">Connecting to Sweetnook. Please wait.</span></div>)
  }

  

  return (
    <div className='container is-max-desktop'>
    <Router>

    <Nav/>
    <Hero size="fullheight" style={{ width: '100%' }}>
    <Hero.Header renderAs="header">
      
    
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Board/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/friends' element={<Friends/>} />
        <Route path='/friends/find' element={<FindFriends/>} />
        <Route path='/friends/sent' element={<SentRequests/>} />
        <Route path='/friends/received' element={<ReceivedRequests/>} />
        <Route path='/users/:userId' element={<UserPage/>}/>
      </Routes>
    </Hero.Header>
    <Hero.Body></Hero.Body>
      
        <Footer className='footer' display='flex' justifyContent='space-between' alignContent='center' alignItems='center'>
          <div>
          <Heading marginless paddingless display='flex' alignItems='center' className='logo-text' textColor='#AA1945'>sweetnook</Heading>
          <Content display='flex' alignItems='center'><p>Developed by <a href='https://github.com/kn8a'>Kn8a</a></p></Content>
          </div>
          <Container textAlign={'center'}>
            <p><a href='https://github.com/kn8a/sweetnook-frontend'>Frontend repository</a></p>
            <p><a href='https://github.com/kn8a/sweetnook-api'>Backend API repository</a></p>
          </Container>
          
          <div>
            <Content display='flex' flexDirection='column' textAlign={'center'}>
              <p>Developed with:
              <Content display='flex' justifyContent='space-between' className='develop-icons' alignItems='start'>
                <DiJavascript1 size={'1.3em'} title={'JavaScript'}></DiJavascript1>
                <DiNodejsSmall size={'1.3em'} title={'NodeJS'}></DiNodejsSmall>
                <DiMongodb size={'1.3em'} title={'MongoDB'}></DiMongodb>
                <DiReact size={'1.3em'} title={'React'}></DiReact>
                <DiHtml5 size={'1.3em'} title={'HTML5'}></DiHtml5>
                <DiCss3 size={'1.3em'} title={'CSS3'}></DiCss3>
              </Content>
              </p>
              
            </Content>
          </div>

        </Footer>
        
      
        
    </Hero>
  
    </Router>
    <ToastContainer position="bottom-left" theme='colored' />
    </div>
  );
}

export default App;
