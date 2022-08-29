import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Box, Message, Control, Label, Input, Textarea, Help, Form, Block, Modal, Container } from 'react-bulma-components'


function Profile() {

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

  const updateProfile = () => {
    
  }


  return (
    <div>
      <Block></Block>
          
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
                    <Button color={'success'} onClick={updateProfile}>Save</Button>
                    <Button color={'danger'} onClick={cancelEdit}>Cancel</Button>
                    </Container>
                    

                    </Box>

                </div>
            <button onClick={toggleEditModal} className="modal-close is-large" aria-label="close"></button>
        </div>
          
        <Box>

<Form.Field horizontal>
  <Form.Field.Label>
    <Form.Label>
      Profile Pic:
    </Form.Label>
  </Form.Field.Label>
  <Form.Field.Body>
    <Form.Field>
      <Form.Control>
        <Form.InputFile
          
        />
      </Form.Control>
    </Form.Field>
  </Form.Field.Body>
</Form.Field>



<Form.Field horizontal>
  <Form.Field.Label>
    <Form.Label>
      Pic URL:
    </Form.Label>
  </Form.Field.Label>
  <Form.Field.Body>
    <Form.Field>
      <Form.Control>
        <Form.Input
          
        />
      </Form.Control>
    </Form.Field>
  </Form.Field.Body>
</Form.Field>

</Box>
          
    </div>
  )
}

export default Profile