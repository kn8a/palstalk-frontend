import React, { useEffect, useState } from "react"
import { Card, Media, Box, Form, Image, Button } from "react-bulma-components"

import axios from "axios"
import Comment from "./Comment"
import { toast } from "react-toastify"

function PostComments(props) {
	const userId = localStorage.getItem("palstalkUserId")
	const token = props.token
	const postId = props.postId
	const profilePic = localStorage.getItem("palstalkUserPic")
	const profileName = localStorage.getItem("palstalkUserName")
	//console.log(profilePic)
	const [comments, setComments] = useState([])
	const commentsURL = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
	const [newComment, setNewComment] = useState("")
	const updatePost = props.updatePost

	const [commentLoading, setCommentLoading] = useState(false)

	useEffect(() => {
		axios
			.get(commentsURL, { headers: { Authorization: `Bearer ${token}` } })
			.then((response) => {
				setComments(response.data)
			})
	}, [])

	const onChange = (e) => {
		setNewComment(e.target.value)
	}

	const submitNewComment = () => {
		setCommentLoading(true)
		if (!newComment) {
			toast.error("Comment field is empty")
			setCommentLoading(false)
			return
		}
		const commentToSubmit = {
			comment: newComment,
			author: userId,
			postId: postId,
		}
		axios
			.post(commentsURL, commentToSubmit, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				axios
					.get(commentsURL, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						setComments(response.data)
						toast.success("Comment posted")
						setNewComment("")
						updatePost()
						setCommentLoading(false)
					})
					.catch((err) => {
						toast.error(
							"Comment posted but didn't update. Please refresh the page."
						)
						setCommentLoading(false)
					})
			})
			.catch((err) => {
				toast.error("Comment didn't post. Please retry.")
				setCommentLoading(false)
			})
	}

	return (
		<div>
			<Box>
				<Card>
					<Card.Content>
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
											required
											onChange={(e) => onChange(e)}
											value={newComment}
											rows='2'
											placeholder={"Enter your comment"}
										/>
									</Form.Control>
								</Form.Field>
								<Form.Field kind='group' justifyContent='right'>
									<Form.Control>
										<small>{`Posting as ${profileName} `}</small>
									</Form.Control>

									<Form.Control>
										<Button
											onClick={submitNewComment}
											size='small'
											loading={commentLoading}
											color='info'
										>
											Comment
										</Button>
									</Form.Control>
								</Form.Field>
							</Media.Item>
						</Media>
					</Card.Content>
				</Card>
				{comments.map((comment) => {
					return (
						<Comment
							key={comment._id}
							comment={comment}
							token={token}
							postId={postId}
							userId={userId}
						/>
					)
				})}
			</Box>
		</div>
	)
}

export default PostComments
