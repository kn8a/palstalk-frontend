import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import {
  Block,
  Columns,
  Container,
  Content,
  Form,
  Box,
  Heading,
  Button,
} from "react-bulma-components"

function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [loginBtnState, setLoginBtnState] = useState()
  const [regBtnState, setRegBtnState] = useState()
  const [regModal, setRegModal] = useState()
  const [registerInfo, setRegisterInfo] = useState({
    name_first: "",
    name_last: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  const loginURL = `${process.env.REACT_APP_API_URL}/users/login`
  const registerURL = `${process.env.REACT_APP_API_URL}/users/register`

  const navigate = useNavigate()

  const login = (e) => {
    setLoginBtnState("is-loading")
    e.preventDefault()
    axios
      .post(loginURL, credentials)
      .then((response) => {
        if (response.data.token) {
          props.setLogin()
          //console.log(response.data.token)
          localStorage.setItem("palstalkToken", response.data.token)
          localStorage.setItem("palstalkUserId", response.data.id)
          localStorage.setItem("palstalkUserPic", response.data.profile_pic)
          const userName =
            response.data.name_first + " " + response.data.name_last
          localStorage.setItem("palstalkUserName", userName)
          setCredentials({ email: "", password: "" })
          toast.success("Logged in")
          navigate("/")
        }
      })
      .catch((error) => {
        console.log(error)
        setLoginBtnState("")
        toast.error(error.response.data.message)
      })
  }

  const demoLogin = (e) => {
    setLoginBtnState("is-loading")
    e.preventDefault()
    const demoCredentials = {
      email: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PASS,
    }
    axios
      .post(loginURL, demoCredentials)
      .then((response) => {
        if (response.data.token) {
          props.setLogin()
          //console.log(response.data.token)
          localStorage.setItem("palstalkToken", response.data.token)
          localStorage.setItem("palstalkUserId", response.data.id)
          localStorage.setItem("palstalkUserPic", response.data.profile_pic)
          const userName =
            response.data.name_first + " " + response.data.name_last
          localStorage.setItem("palstalkUserName", userName)
          setCredentials({ email: "", password: "" })
          toast.success("Logged in")
          navigate("/")
        }
      })
      .catch((error) => {
        console.log(error)
        setLoginBtnState("")
        toast.error(error.response.data.message)
      })
  }

  const register = (e) => {
    setRegBtnState("is-loading")
    e.preventDefault()
    //console.log(registerInfo)
    axios
      .post(registerURL, registerInfo)
      .then((response) => {
        //console.log(response)
        if (response.data.message == "Profile created successfully") {
          toast.success(`${response.data.message}. Please login to continue`)
          setRegBtnState("")
          setRegisterInfo({
            name_first: "",
            name_last: "",
            email: "",
            password: "",
            confirm_password: "",
          })
          toggleRegModal()
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
        setRegBtnState("")
      })
  }

  const onChange = (e) => {
    const value = e.target.value
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    })
  }

  const onRegChange = (e) => {
    const value = e.target.value
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: value,
    })
  }

  const toggleRegModal = () => {
    if (!regModal) {
      setRegModal("is-active")
    } else {
      setRegModal(null)
    }
  }

  const [TOSModal, setTOSModal] = useState(null)
  const toggleTOSModal = () => {
    if (!TOSModal) {
      setTOSModal("is-active")
    } else {
      setTOSModal(null)
    }
  }

  return (
    <div className='login-main'>
      <Block></Block>
      <div className='spacer-div'></div>
      <Box>
        <Columns>
          <Columns.Column>
            <Container
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Container
                display='flex'
                flexDirection='column'
                justifyContent='center'
                textAlign={"center"}
              >
                <div className='login-large-logo'>sweetnook</div>
                <p>Where sweet friends meet and share.</p>
              </Container>
            </Container>
          </Columns.Column>
          <div className='divider is-vertical'>
            Login<Block></Block>
          </div>
          <Columns.Column>
            <Container display='flex' flexDirection='column'>
              <form onSubmit={login}>
                <Block></Block>
                <input
                  className='input'
                  required
                  onChange={onChange}
                  value={credentials.email}
                  name='email'
                  type='email'
                  placeholder='example@email.com'
                />
                <Block></Block>
                <input
                  className='input'
                  required
                  onChange={onChange}
                  value={credentials.password}
                  name='password'
                  type='password'
                  placeholder='*********'
                />
                <Block></Block>
                <Content display='flex' justifyContent='center'>
                  <button className={`button is-info ${loginBtnState}`}>
                    Login
                  </button>
                </Content>
              </form>
              <div className='divider'>Or</div>
              <Content display='flex' justifyContent='space-around'>
                <button className='button is-success' onClick={toggleRegModal}>
                  Create New Account
                </button>
                <button className='button is-success' onClick={demoLogin}>
                  Login as Demo User
                </button>
              </Content>

              <div className={`modal ${regModal}`}>
                <div className='modal-background'></div>
                <div className='modal-content'>
                  <form className='box' onSubmit={register}>
                    Sign up
                    <Form.Field kind='group'>
                      <Form.Control>
                        <input
                          className='input'
                          required
                          onChange={onRegChange}
                          value={registerInfo.name_first}
                          name='name_first'
                          type='text'
                          placeholder='John'
                        />
                      </Form.Control>
                      <Form.Control>
                        <input
                          className='input'
                          required
                          onChange={onRegChange}
                          value={registerInfo.name_last}
                          name='name_last'
                          type='text'
                          placeholder='Smith'
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Control>
                        <input
                          className='input'
                          required
                          onChange={onRegChange}
                          value={registerInfo.email}
                          name='email'
                          type='email'
                          placeholder='example@email.com'
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Control>
                        <input
                          className='input'
                          required
                          onChange={onRegChange}
                          value={registerInfo.password}
                          name='password'
                          type='password'
                          placeholder='*********'
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Control>
                        <input
                          className='input'
                          required
                          onChange={onRegChange}
                          value={registerInfo.confirm_password}
                          name='confirm_password'
                          type='password'
                          placeholder='*********'
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Control>
                        <div className='select'>
                          <select
                            name='gender'
                            required
                            defaultValue={"default"}
                            value={registerInfo.gender}
                            placeholder=''
                            onChange={onRegChange}
                          >
                            <option value={"default"} disabled>
                              Choose an option
                            </option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                            <option value='Prefer not to say'>
                              Prefer not to say
                            </option>
                          </select>
                        </div>
                      </Form.Control>
                    </Form.Field>
                    <Form.Field>
                      <Form.Control>
                        <input className='agree' required type='checkbox' />
                        {` `}I agree to the{" "}
                        <a onClick={toggleTOSModal}>terms and conditions</a>
                      </Form.Control>
                    </Form.Field>
                    <Form.Control>
                      <button className={`button is-success ${regBtnState}`}>
                        Create My Account
                      </button>
                    </Form.Control>
                  </form>
                </div>
                <button
                  onClick={toggleRegModal}
                  className='modal-close is-large'
                  aria-label='close'
                ></button>
              </div>
            </Container>
          </Columns.Column>
        </Columns>
      </Box>
      <div className={`modal ${TOSModal}`}>
        <div className='modal-background' onClick={toggleTOSModal}></div>
        <div className='modal-content'>
          <Content>
            <Box>
              <Heading size={5} textAlign='center'>
                Terms and conditions:
              </Heading>
              <Block></Block>
              <Heading subtitle size={6} textAlign={"center"}>
                1. Be a decent person.
              </Heading>
              <Block></Block>
              <Container display='flex' justifyContent='center'>
                <Button color={"success"} onClick={toggleTOSModal}>
                  Ok
                </Button>
              </Container>
            </Box>
          </Content>
        </div>
        <button
          onClick={toggleTOSModal}
          className='modal-close is-large'
          aria-label='close'
        ></button>
      </div>
    </div>
  )
}

export default Login
