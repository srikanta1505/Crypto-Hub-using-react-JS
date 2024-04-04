import React from "react";
import { Link } from "react-router-dom";
import About from "./About";

const Footer = () => {
	const BacktoTopHandler = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	return (
		<>
			<footer className=" text-white flex p-5 justify-center items-center  flex-wrap flex-col max-h-max w-full bg-gray-600">
				<button
					className="h-10 w-32 border-2 border-solid text-white border-white rounded-md  bg-transparent "
					onClick={BacktoTopHandler}
				>
					Back to Top
				</button>

				<Link to="/about">About</Link>

				<Link to="/community">Community</Link>
				<div>@ 2024 Srikanta Nanda</div>
			</footer>
		</>
	);
};

export default Footer;
