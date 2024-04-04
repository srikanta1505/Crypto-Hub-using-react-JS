import React from "react";

const ErrorPage = ({ messages }) => {
	return (
		<>
			<div>Connection has lost. Please try again later...</div>
			<div>{messages}</div>
		</>
	);
};

export default ErrorPage;
