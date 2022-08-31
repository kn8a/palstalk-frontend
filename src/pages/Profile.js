import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Box, Message, Control, Label, Input, Textarea, Help, Form, Block, Modal, Container } from 'react-bulma-components'

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";


function Profile(props) {

  const profilePic = localStorage.getItem('palstalkUserPic')
  const profileName = localStorage.getItem('palstalkUserName')
  const token = localStorage.getItem('palstalkToken')
  const ProfileURL = `http://localhost:3000/api/users/profile`

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

  const cancelEdit = () => {
    setUser(userAsPulled)
    toggleEditModal()
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
  const [file, setFile] = useState();

  const handleFile = (e) => {
    // Getting the files from the input
    setFile(e.target.files[0])
  }

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}


  const handleUpload = (e) => {
   

    let formData = new FormData();

    //Adding files to the formdata
    formData.append("profile_pic", file);

    // axios({
    //   url: "http://localhost:3000/api/users/upload",
    //   method: "POST",
    //   headers: {"Authorization": `Bearer ${token}`},
    //   data: formData,
    // })
    axios.post("http://localhost:3000/api/users/upload", formData, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`}})
      .then((res) => { console.log(res.data)}) // Handle the response from backend here
      .catch((err) => { console.log(err)}); // Catch errors if any
  }
  
  return (
    <div>
      <Block></Block>

      <div>
      <input
          type="file"
          multiple="multiple"  //To select multiple files
          onChange={(e) => handleFile(e)}
        />
        <button onClick={(e) => handleUpload(e)}
        >Send Files</button>
      </div>
          
          <Button onClick={toggleEditModal}>Edit Profile</Button>
          
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
                              placeholder="Field control - text input"
                              type="text"
                              value={user.name_first}
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
                          Bio:
                        </Form.Label>
                      </Form.Field.Label>
                      <Form.Field.Body>
                        <Form.Field>
                          <Form.Control>
                            <Form.Textarea
                              value={user.bio}
                              placeholder=""
                              type="text"
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
                            <Form.Select defaultValue={user.gender}>
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
                    <Button color={'success'} >Save</Button>
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