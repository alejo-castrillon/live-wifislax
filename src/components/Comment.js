import React, { Component } from "react"
import { MDBCollapse, MDBListGroup } from "mdbreact"

import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default class Comment extends Component {
	constructor() {
		super()
		this.state = { replies: [], collapseID: "" }
	}

	componentDidMount = () => {
		const currentReplies = this.props.comment.replies
		if (currentReplies != null) {
			const replies = Object.keys(currentReplies).map(key => {
				var reply = currentReplies[key]
				return reply
			})
			this.setState({ replies: replies })
		}
	}

	clear = string => {
		while (string.includes(' ')) {
			string = string.replace(' ', '')
		}
		return string.toLowerCase()
	}

	handleCommentReply = () => {
		// this.props.onCommentReply(this.props.comment)
		console.log('reply');
	}

	handleCommentReport = () => {
		this.props.onCommentReport(this.props.comment)
	}

	toggleCollapse = collapseID => () => {
		this.setState(prevState => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ""
		}))
	}

	render() {
		var { username, content, date } = this.props.comment;
		console.log(this.state.replies);

		return (
			<div className='mb-1'>
				<div className="media">
					<img
						className="mr-2 bg-light rounded"
						src={`https://api.adorable.io/avatars/48/${this.clear(username)}@adorable.io.png`}
						alt={username}
					/>
					<div className="media-body p-2 shadow-sm rounded bg-light border mr-2">
						<small className="float-right text-muted">{date}</small>
						<h6 className="mr-2"><strong>{username}</strong></h6>
						{content}
					</div>
				</div>

				<div className='ml-2'>
					<button
						className='btn btn-warning d-inline-block ml-5 py-1 px-1'
						// onClick={this.handleCommentReply}
						onClick={this.toggleCollapse('collapse')}
					>
						{this.state.replies.length}
						<i className="fa fa-comment-alt ml-1" />
					</button>
					<button
						className='btn btn-danger d-inline-block ml-5 py-1 px-2'
						onClick={this.handleCommentReport}
					>
						<i className="fa fa-flag" />
					</button>
				</div>

				<MDBCollapse id='collapse' isOpen={this.state.collapseID}>
					<MDBListGroup>
						<CommentForm onAddComment={this.handleCommentReply} />
						<CommentList
							loading={false}
							comments={this.props.comment.replies}
							onCommentReply={this.handleCommentReply}
							onCommentReport={this.handleCommentReport}
						/>
					</MDBListGroup>
				</MDBCollapse>
			</div>
		)
	}
}