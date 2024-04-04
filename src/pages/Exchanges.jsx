import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import ExchnageCard from "../components/ExchnageCard";
import ErrorPage from "../components/ErrorPage";

const Exchanges = () => {
	const [exachngesData, setExchangesData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		const getEchnagesData = async () => {
			const api = "https://api.coingecko.com/api/v3";
			try {
				const { data } = await axios.get(`${api}/exchanges`);
				setExchangesData(data);
				setLoader(false);
			} catch (error) {
				setError(true);
				setLoader(false);
			}
		};
		getEchnagesData();
	}, []);

	if (error)
		return (
			<ErrorPage messages={"Error Occoured While connecting exchanges"} />
		);
	else
		return (
			<Fragment>
				{loader ? (
					<Loader />
				) : (
					<>
						<div className="mx-2 inline-flex flex-wrap place-content-center">
							{exachngesData.map((item) => (
								<ExchnageCard
									key={item.id}
									name={item.name}
									url={item.url}
									rank={item.trust_score_rank}
									image={item.image}
								/>
							))}
						</div>
					</>
				)}
			</Fragment>
		);
};

export default Exchanges;

//  fetch(`${api}/exchanges`)
//   .then((data) => data.json())
//   .then((data) => console.log(data));
