import React from "react";

const MarketDetails = ({ item, value }) => {
	return (
		<>
			<div className="flex flex-wrap justify-around p-3">
				<p>{item}</p>
				<p>{value}</p>
			</div>
		</>
	);
};

export default MarketDetails;
