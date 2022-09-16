import React from "react"
import {
	Card,
	Media,
	Block,
	Button,
	Heading,
	Content,
	Image,
	Container,
} from "react-bulma-components"

import axios from "axios"
import { toast } from "react-toastify"

function ReqRecCard(props) {
	//console.log(props.request)
	const token = localStorage.getItem("palstalkToken")
	const userId = localStorage.getItem("palstalkUserId")
	const updateRequests = props.updateRequests

	const accept = (id) => {
		const acceptURL = `${process.env.REACT_APP_API_URL}/requests/${props.request._id}/accept`
		axios
			.put(acceptURL, "", { headers: { Authorization: `Bearer ${token}` } })
			.then(() => {
				updateRequests()
				toast.success(
					`${props.request.from.name_first} ${props.request.from.name_last} is now your friend`
				)
			})
	}

	const decline = (id) => {
		const declineURL = `${process.env.REACT_APP_API_URL}/requests/${props.request._id}/decline`
		axios
			.put(declineURL, "", { headers: { Authorization: `Bearer ${token}` } })
			.then(() => {
				updateRequests()
				toast.info(
					`Declined request from ${props.request.from.name_first} ${props.request.from.name_last}`
				)
			})
	}

	return (
		<Card style={{ width: 200, margin: "auto" }} textAlign='center'>
			<Card.Content>
				<Media justifyContent='center'>
					<Media.Item
						display='flex'
						justifyContent='center'
						renderAs='figure'
					>
						<Image
							size={128}
							alt={`Picture of ${props.request.from.name_first} ${props.request.from.name_last}`}
							src={`${process.env.REACT_APP_API_URL}/file/${props.request.from.profile_pic}`}
						/>
					</Media.Item>
				</Media>
				<Container>
					<Heading
						size={4}
					>{`${props.request.from.name_first} ${props.request.from.name_last}`}</Heading>
				</Container>
				<Block></Block>
				<Content>
					<Button
						onClick={accept}
						color={"success"}
						fullwidth='true'
						rounded='true'
					>
						Accept
					</Button>

					<Button
						onClick={decline}
						color={"danger"}
						style={{ marginTop: 10 }}
						size={"small"}
						rounded='true'
					>
						Decline
					</Button>
				</Content>
			</Card.Content>
		</Card>
	)
}

export default ReqRecCard
