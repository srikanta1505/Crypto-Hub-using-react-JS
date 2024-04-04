import { Fragment } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExchnageCard = ({ name, image, url, rank }) => {
	return (
		<Fragment>
			<a
				href={url}
				alt={name}
				target="blank"
			>
				<div className="h-48 w-48  text-gray-600 shadow-xl rounded-md mt-10 m-5 p-6 inline-flex flex-wrap flex-col ease-in-out delay-200 hover:scale-110">
					<div className=" flex justify-center items-center flex-col">
						<img
							src={image}
							alt={name}
							className=" object-cover h-10 w-10 	"
						/>
						<div className="text-center my-4 font-bold">{rank}</div>
						<div className=" font-bold text-center">{name}</div>
					</div>
				</div>
			</a>
		</Fragment>
	);
};

export default ExchnageCard;
