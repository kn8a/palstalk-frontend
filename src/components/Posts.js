import React, { useState } from "react"
import {
	Loader,
	Card,
	Media,
	Block,
	Button,
	Form,
	Image,
	Heading,
} from "react-bulma-components"
import axios from "axios"
import Post from "./Post"
import { toast } from "react-toastify"

function Posts(props) {
	const token = props.token
	const profilePic = localStorage.getItem("palstalkUserPic")
	const profileName = localStorage.getItem("palstalkUserName")
	const postSubmitURL = `${process.env.REACT_APP_API_URL}/posts`
	const updatePosts = props.updatePosts

	const [newPost, setNewPost] = useState()
	//console.log(props.userId, props.token)
	if (!props.posts) {
		return (
			<Block>
				<Loader />
			</Block>
		)
	}

	const onChange = (e) => {
		setNewPost(e.target.value)
	}

	const submitNewPost = () => {
		const postToSubmit = {
			content: newPost,
			author: props.userId,
		}
		axios
			.post(postSubmitURL, postToSubmit, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				updatePosts()
				toast.success("Posted")
				setNewPost("")
			})
	}

	return (
		<div>
			<Block>
				<Card>
					<Card.Content>
						<Heading subtitle textAlign={"center"}>
							What's on your mind?
						</Heading>
						<Media>
							<Media.Item align='left'>
								<Image
									size={64}
									src={`${process.env.REACT_APP_API_URL}/file/${profilePic}`}
								/>
							</Media.Item>
							<Media.Item align='center'>
								<Form.Field>
									<Form.Control>
										<Form.Textarea
											onChange={(e) => onChange(e)}
											value={newPost}
											rows='3'
											placeholder={"Say something..."}
										/>
									</Form.Control>
								</Form.Field>
								<Form.Field kind='group' justifyContent='right'>
									<Form.Control>
										<small>{`Posting as ${profileName} `}</small>
									</Form.Control>
									<Form.Control>
										<Button onClick={submitNewPost} color='info'>
											Post
										</Button>
									</Form.Control>
								</Form.Field>
							</Media.Item>
						</Media>
					</Card.Content>
				</Card>
			</Block>
			<div>
				{props.posts.map((post) => {
					return (
						<Block key={post._id}>
							<Post post={post} token={token} userId={props.userId} />
						</Block>
					)
				})}
			</div>
		</div>
	)
}

export default Posts
