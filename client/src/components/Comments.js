import React, { useState } from "react";
import "./styles/Comments.css";

const Comments = ({
	comments,
	optionsVisible,
	setOptionsVisible,
	commentText,
	setCommentText,
	handleCommentSubmit,
	handleCommentDelete,
}) => {
	const months = {
		"01": "January",
		"02": "February",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "September",
		"10": "October",
		"11": "November",
		"12": "December",
	};

	const formatDate = (dateStr) => {
		let day = dateStr.split("-")[2].split("T")[0];
		// if the day string has a leading zero
		if (day[0] === "0") {
			day = day[1];
		}

		const month = months[dateStr.split("-")[1]];

		const year = dateStr.split("-")[0];

		const newDate = `${month} ${day}, ${year}`;
		return newDate;
	};

	const handleCommentFocus = (e) => {
		setOptionsVisible("flex");
	};

	const handleCommentCancel = (e) => {
		setOptionsVisible("none");
		setCommentText("");
	};

	const renderComments = () => {
		return comments.map((comment) => {
			const formattedDate = formatDate(comment.dateposted);

			return (
				<div className="comment" id="whitetext" key={comment.commentid}>
					<a
						className="avatar"
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<i
							className="train large icon"
							style={{
								position: "relative",
								color: "white",
								marginLeft: "-12px",
								marginRight: "-5px",
								marginTop: "5px",
							}}
						></i>
					</a>
					<div className="content" id="whitetext" style={{ marginLeft: "0" }}>
						<a className="author" id="whitetext">
							{comment.username}
						</a>
						<div className="metadata" id="whitetext">
							<span className="date" id="greytext">
								{formattedDate}
							</span>
						</div>
						<div
							className="deleteButton"
							style={{ float: "right", display: "inline" }}
						>
							<i
								className="trash icon"
								onClick={(e) => {
									handleCommentDelete(comment.commentid);
								}}
								style={{ cursor: "pointer" }}
							></i>
						</div>
						<div className="text" id="whitetext">
							{comment.content}
						</div>
					</div>
				</div>
			);
		});
	};

	const renderedComments = renderComments();

	return (
		<div className="comments-component" id="whitetext">
			<div className="ui comments">
				{" "}
				<h3 className="ui dividing header" id="whitetext">
					Comments
				</h3>
				<div className="comment-input">
					<form onSubmit={handleCommentSubmit}>
						<div
							className="ui input inverted transparent"
							style={{ color: "white", marginBottom: "10px" }}
						>
							<input
								type="text"
								placeholder="Say something..."
								onFocus={handleCommentFocus}
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
							/>
						</div>
						<hr />
						{
							<div
								id="submit-options"
								style={{ display: optionsVisible, justifyContent: "flex-end" }}
							>
								<button
									type="reset"
									className="ui secondary button"
									onClick={handleCommentCancel}
								>
									Cancel
								</button>
								<button className="ui transparent button" type="submit">
									Comment
								</button>
							</div>
						}
					</form>
				</div>
				<div>
					{comments.length === 0 ? (
						<div className="no-comments">No comments yet!</div>
					) : (
						renderedComments
					)}
				</div>
			</div>
		</div>
	);
};

export default Comments;
