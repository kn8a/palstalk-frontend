import axios from 'axios'
import {  } from 'bloomer/lib/elements/Heading'
import { Title } from 'bloomer/lib/elements/Title'
import React, { useEffect, useState } from 'react'
import { Heading, Button, Box, Message, Control, Label, Input, Textarea, Help, Form, Block, Modal, Container, Image, Content } from 'react-bulma-components'



function Profile(props) {

  //const profilePic = localStorage.getItem('palstalkUserPic')
  const profileName = localStorage.getItem('palstalkUserName')
  const token = localStorage.getItem('palstalkToken')
  const ProfileURL = `http://localhost:3000/api/users/profile`
  const profileUpdateURL = 'http://localhost:3000/api/users/update'

  const [user,setUser] = useState({
    name_first: '',
    name_last: '',
    gender: '',
    email: '',
    bio:'',
    location: '',
    password: '',
    profile_pic: '',
    friends: [],
    pending_requests: [],
    posts: [],
    role: '',
  })

  const [userAsPulled,setUserAsPulled] = useState({
    name_first: '',
    name_last: '',
    gender: '',
    email: '',
    bio:'',
    location: '',
    password: '',
    profile_pic: '',
    friends: [],
    pending_requests: [],
    posts: [],
    role: '',
  })

  const [editModal, setEditModal] = useState(null)

  useEffect(()=> {
    axios.get(ProfileURL, {headers: {"Authorization": `Bearer ${token}`}})
    .then((response) => {
      setUser(response.data)
      setUserAsPulled(response.data)
    })
  },[])

  const toggleEditModal = () => {
    if (!editModal) {
        setEditModal('is-active')
    } else {
        setEditModal(null)
    }
    
}

  const userInfoChange = (e) => {
    const value = e.target.value
        setUser({
            ...user,
            [e.target.name]: value
        })
  }

  const cancelEdit = () => {
    setUser(userAsPulled)
    toggleEditModal()
  }

  const [updateLoading,setUpdateLoading] = useState(false)

  const submitEdit = () => {
    setUpdateLoading(true)
    axios.put(profileUpdateURL, user, {headers: {"Authorization": `Bearer ${token}`}})
    .then((response) => {
      axios.get(ProfileURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => {
        setUser(response.data)
        setUserAsPulled(response.data)
        setUpdateLoading(false)
        toggleEditModal()
      })
    })
  }

   
  const updateProfilePic = (e) => {
    const data = file
    axios.post("http://localhost:3000/api/users/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`
      },
    });
  }


  //*image upload
  const [file, setFile] = useState({name:'Click to select image', size:''});
  const [uploadDisabled, setUploadDisable] = useState(true)
  const [uploadLoading, setUploadLoading] = useState('')

  const handleFile = (e) => {
    // Getting the files from the input
    //console.log(e.target.files[0].type.slice(0,5), e.target.files[0].size)
    if (e.target.files[0].type.slice(0,5) == 'image' && e.target.files[0].size < 1*1024*1024) {
      setFile(e.target.files[0])
      setUploadDisable(false)
    } else {
      setFile({name: 'File too large or Invalid image file'})
    setUploadDisable(true)
    }
    
    
  }


  const handleUpload = (e) => {
    setUploadLoading('is-loading')
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("profile_pic", file);

    axios.post("http://localhost:3000/api/users/upload", formData, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`}})
      .then((response)=>{
        axios.get(ProfileURL, {headers: {"Authorization": `Bearer ${token}`}})
        .then((response) => {
        setUser(response.data)
        setUserAsPulled(response.data)
        })
        localStorage.setItem('palstalkUserPic', response.data.fileId)
        setFile({name:'Click to select image', size:''})
        setUploadDisable(true)
        setUploadLoading('')
      })
      .catch((err) => { console.log(err)}); // Catch errors if any
  }
  
  return (
    <div>
      <Block></Block>
 
    <Box>
    <Heading size={5}> My profile Image</Heading>
    <Image size={128} src={`http://localhost:3000/api/file/${user.profile_pic}`}></Image>
    <Block></Block>
    <div class="file has-name is-fullwidth is-info boxed">
      <label class="file-label">
    <input class="file-input" type="file" name="resume" onChange={(e) => handleFile(e)}></input>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
    <span class="file-name">
      {file.name}
    </span>
  </label><Block></Block>
  <button onClick={(e) => handleUpload(e)} disabled={uploadDisabled} className={`is-info button ${uploadLoading}` }>Confirm & Upload</button>
</div>
    </Box>
    
    <Block>
    </Block>
    <Box>
      <Heading  size={5}>My info</Heading>
      
      <Content>
        <ul>
          <li>First Name: {user.name_first}</li>
          <li>Last Name: {user.name_last}</li>
          <li>Location: {user.location}</li>
          <li>Gender: {user.gender}</li>
          <li>About me:<pre id='about-me'>{user.bio}</pre></li>
          
        </ul>
      </Content>
      <Button color={'info'} onClick={toggleEditModal}>Edit Profile</Button>
    </Box>
      

    <Box>
      <Heading  size={5}>My posts</Heading>
    </Box>

          

          
          <div className={`modal ${editModal}`}>
            <div className="modal-background" onClick={toggleEditModal}></div>
                <div className="modal-content">
                <Box>

                    <Form.Field horizontal>
                      <Form.Field.Label>
                        <Form.Label>
                          First name:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Input
                              name='name_first'
                              placeholder="Field control - text input"
                              type="text"
                              value={user.name_first}
                              onChange={userInfoChange}
                            />
                          </Form.Control>
                          
                          
                        </Form.Field>
                      </Form.Field.Body>
                    </Form.Field>
                    <Form.Field horizontal>
                      <Form.Field.Label>
                        <Form.Label>
                          Last name:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Input
                              type="text"
                              value={user.name_last}
                              name='name_last'
                              onChange={userInfoChange}
                            />
                          </Form.Control>
                          
                          
                        </Form.Field>
                      </Form.Field.Body>
                    </Form.Field>

                    

                    <Form.Field horizontal>
                      <Form.Field.Label>
                        <Form.Label>
                          Location:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Input
                              placeholder="City, Country"
                              type="text"
                              value={user.location}
                              name='location'
                              onChange={userInfoChange}
                            />
                          </Form.Control>
                          
                          <Form.Help>
                            You can also include a state and Postal code
                          </Form.Help>
                        </Form.Field>
                      </Form.Field.Body>
                    </Form.Field>
                    <Form.Field horizontal>
                      <Form.Field.Label>
                        <Form.Label>
                          About me:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Textarea
                              value={user.bio}
                              placeholder=""
                              type="text"
                              name='bio'
                              onChange={userInfoChange}
                            />
                          </Form.Control>
                        </Form.Field>
                      </Form.Field.Body>
                    </Form.Field>

                    <Form.Field horizontal>
                      <Form.Field.Label>
                        <Form.Label>
                          Gender:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Select defaultValue={user.gender} value={user.gender} name='gender' onChange={userInfoChange}>
                            <option value={"default"} disabled>Choose an option</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                              <option>Prefer not to say</option>
                            </Form.Select>
                          </Form.Control>
                        </Form.Field>
                      </Form.Field.Body>
                    </Form.Field>
                    <Block></Block>
                    <Container display='flex' justifyContent='space-around'>
                    <Button color={'success'} loading={updateLoading} onClick={submitEdit}>Save</Button>
                    <Button color={'danger'} onClick={cancelEdit}>Cancel</Button>
                    </Container>
                    

                    </Box>

                </div>
            <button onClick={toggleEditModal} className="modal-close is-large" aria-label="close"></button>
        </div>


          
    </div>
  )
}

export default Profile