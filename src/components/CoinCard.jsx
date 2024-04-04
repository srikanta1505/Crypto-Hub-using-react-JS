import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { FaExternalLinkAlt } from "react-icons/fa";

const CoinCard = ({ id, price, currency, name, image, symbol }) => {
	return (
		<Fragment>
			<Link to={`/coins/${id}`}>
				<div className="h-64 w-64 box-border shadow-xl rounded-md m-5 p-6 inline-flex flex-wrap flex-col transition-opacity ease-in-out delay-200 hover:scale-110">
					<div className=" font-serif text-center text-gray-500  font-bold mb-3">
						{name}
					</div>
					<hr className="border-t-2 border-gray-300" />

					<div className=" flex mt-4 justify-center items-center">
						<img
							src={image}
							alt={name}
							className=" object-cover h-20 w-20 	"
						/>
					</div>

					<div className="text-center text-gray-600 mt-4 font-bold truncate">
						{currency === "inr"
							? price.toLocaleString("en-IN")
							: price.toLocaleString()}{" "}
						<span>{currency}</span>
					</div>

					<div className=" font-serif text-center font-bold mt-2 text-gray-500 ">
						{symbol}
					</div>
				</div>
			</Link>
		</Fragment>
	);
};

export default CoinCard;
