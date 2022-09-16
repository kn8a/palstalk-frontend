import axios from "axios"
import React, { useEffect, useState } from "react"
import {
	Block,
	Columns,
	Image,
	Heading,
	Container,
	Tabs,
	Button,
	Box,
} from "react-bulma-components"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Nav from "../components/Nav"
import UserFriendCard from "../components/userPageComponents/UserFriendCard"
import UserPosts from "../components/userPageComponents/UserPosts"

function UserPage(props) {
	const token = localStorage.getItem("palstalkToken")
	const params = useParams()
	const userURL = `${process.env.REACT_APP_API_URL}/users/${params.userId}`
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name_first: "",
		name_last: "",
		friends: [],
	})
	const [friend, setFried] = useState("")
	const [content, setContent] = useState(<Loader />)

	useEffect(() => {
		const token = localStorage.getItem("palstalkToken")

		if (!token) {
			navigate("/login")
		}
	}, [])

	useEffect(() => {
		axios
			.get(userURL, { headers: { Authorization: `Bearer ${token}` } })
			.then((response) => {
				setUser(response.data.user)
				setFried(response.data.friend)
				console.log(response.data.user)
			})
	}, [params])

	const [addFriendBtn, setAddFriendBtn] = useState(false)

	const sendFriendRequest = (id) => {
		const addFriendURL = `${process.env.REACT_APP_API_URL}/users/${user._id}/send-friend-request`
		axios
			.post(addFriendURL, "", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				//updateUsers()

				toast.info(
					`Sent friend request to ${user.name_first} ${user.name_last}`
				)
			})
			.catch((err) => {
				//console.log(err)
				toast.error(err.response.data.message)
			})
		setAddFriendBtn(true)
	}

	const [friendsModal, setFriendsModal] = useState("")

	const toggleFriendsModal = () => {
		if (!friendsModal) {
			setFriendsModal("is-active")
		} else {
			setFriendsModal(null)
		}
	}

	useEffect(() => {
		if (!user || friend == "") {
			setContent(<Loader />)
		}

		//console.log(friend)

		if (friend) {
			setContent(
				<div>
					<Nav />
					<Block></Block>

					<div className={`modal ${friendsModal}`}>
						<div
							className='modal-background'
							onClick={toggleFriendsModal}
						></div>
						<div className='modal-content'>
							<Box>
								<Heading
									subtitle
									size={5}
									textAlign='center'
								>{`${user.name_first}'s friends`}</Heading>
								<Block
									display='flex'
									justifyContent='space-evenly'
									className='friends-container user-friends'
									flexWrap='wrap'
								>
									{user.friends.map((friend) => {
										return (
											<div key={friend._id}>
												<UserFriendCard
													toggleModal={toggleFriendsModal}
													friend={friend}
												></UserFriendCard>
											</div>
										)
									})}
								</Block>
							</Box>
						</div>
						<button
							onClick={toggleFriendsModal}
							className='modal-close is-large'
							aria-label='close'
						></button>
					</div>

					<Columns>
						<Columns.Column
							size={4}
							display={"flex"}
							justifyContent='center'
							alignItems='center'
							flexDirection='column'
						>
							<Image
								size={128}
								src={`${process.env.REACT_APP_API_URL}/file/${user.profile_pic}`}
							></Image>
							<Block></Block>
							<Heading
								textAlign={"center"}
								alignItems={"flex-end"}
							>{`${user.name_first} ${user.name_last}`}</Heading>
							<Button
								onClick={toggleFriendsModal}
							>{`View ${user.name_first}'s friends`}</Button>
						</Columns.Column>
						<div className='vertLine'></div>

						<Columns.Column
							display='flex'
							justifyContent='center'
							flexDirection='column'
							alignItems='center'
						>
							<Heading subtitle size={5}>
								About {user.name_first}
							</Heading>
							<div style={{ whiteSpace: "pre-wrap" }}>{user.bio}</div>
						</Columns.Column>
					</Columns>
					<div className='horLine'></div>
					<Block></Block>
					<Container textAlign={"center"}>
						<Heading
							subtitle
							size={5}
						>{`${user.name_first}'s posts`}</Heading>
					</Container>
					<Container>
						<Block></Block>
						<UserPosts posts={user.posts}></UserPosts>
					</Container>
				</div>
			)
		}
		if (friend == false) {
			//console.log(friend)
			setContent(
				<div>
					<Nav />
					<Block></Block>
					<div className={`modal ${friendsModal}`}>
						<div
							className='modal-background'
							onClick={toggleFriendsModal}
						></div>
						<div className='modal-content'>
							<Box>
								<Heading
									subtitle
									size={5}
									textAlign='center'
								>{`${user.name_first}'s friends`}</Heading>
								<Block
									display='flex'
									justifyContent='space-evenly'
									className='friends-container user-friends'
									flexWrap='wrap'
								>
									{user.friends.map((friend) => {
										return (
											<div key={friend._id}>
												<UserFriendCard
													toggleModal={toggleFriendsModal}
													friend={friend}
												></UserFriendCard>
											</div>
										)
									})}
								</Block>
							</Box>
						</div>
						<button
							onClick={toggleFriendsModal}
							className='modal-close is-large'
							aria-label='close'
						></button>
					</div>

					<Columns>
						<Columns.Column
							size={4}
							display={"flex"}
							justifyContent='center'
							alignItems='center'
							flexDirection='column'
						>
							<Image
								size={128}
								src={`${process.env.REACT_APP_API_URL}/file/${user.profile_pic}`}
							></Image>
							<Block></Block>
							<Heading
								textAlign={"center"}
								alignItems={"flex-end"}
							>{`${user.name_first} ${user.name_last}`}</Heading>
							<Button
								onClick={toggleFriendsModal}
							>{`View ${user.name_first}'s friends`}</Button>
						</Columns.Column>
						<div className='vertLine'></div>

						<Columns.Column
							display='flex'
							justifyContent='center'
							flexDirection='column'
							alignItems='center'
						>
							<Heading subtitle size={5}>
								About {user.name_first}
							</Heading>
							<div style={{ whiteSpace: "pre-wrap" }}>{user.bio}</div>
						</Columns.Column>
					</Columns>
					<div className='horLine'></div>
					<Block></Block>
					<Container display='flex' justifyContent='right'>
						<Button
							onClick={sendFriendRequest}
							color={"info"}
							disabled={addFriendBtn}
						>
							Send friend request
						</Button>
					</Container>
				</div>
			)
		}
	}, [friend, addFriendBtn, friendsModal, user])

	return <div>{content}</div>
}

export default UserPage
