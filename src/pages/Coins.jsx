import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CoinCard from "../components/CoinCard";
import ErrorPage from "../components/ErrorPage";

const Coins = () => {
	const [coinData, setCoinData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [currency, setCurrency] = useState("inr");
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);

	const DropDownHandler = (e) => {
		setCurrency(e.target.value);
	};

	const PaginationHandler = (value) => {
		setPage(value);
		setLoader(true);
	};

	const btns = new Array(10).fill(1);

	useEffect(() => {
		const getCoinsData = async () => {
			const api = "https://api.coingecko.com/api/v3";
			try {
				const { data } = await axios.get(
					`${api}/coins/markets?vs_currency=${currency}&page=${page}`
				);
				setCoinData(data);
				// console.log(data);
				setLoader(false);
			} catch (error) {
				setError(true);
				setLoader(false);
			}
		};
		getCoinsData();
	}, [currency, page]);

	if (error)
		return (
			<ErrorPage
				messages={"Error Occoured while connecting with coin page"}
			/>
		);
	else
		return (
			<Fragment>
				{loader ? (
					<Loader />
				) : (
					<>
						<div className="flex justify-around my-7">
							<p className="font-bold text-4xl px-2">
								Please click on the Coin to get more details...
							</p>
							<div>
								<label htmlFor="currency">
									Selected Currency{" "}
								</label>
								<select
									className="text-center outline-none w-auto rounded-md "
									name="currency"
									id="currency"
									onChange={DropDownHandler}
								>
									<option value="inr">INR</option>
									<option value="usd">USD</option>
									<option value="eur">EURO</option>
								</select>
							</div>
						</div>
						<div className="mx-2 inline-flex flex-wrap place-content-center">
							{coinData.map((item) => (
								<CoinCard
									key={item.id}
									id={item.id}
									name={item.name}
									symbol={item.symbol}
									price={item.current_price}
									image={item.image}
									high={item.high_24h}
									low={item.low_24h}
									currency={currency}
								/>
							))}
						</div>

						<div className="flex justify-center gap-3 my-5">
							{btns.map((item, index) => (
								<button
									className="h-8 w-8 rounded-md border-2 border-gray-300 border-solid"
									key={index}
									onClick={() => PaginationHandler(index + 1)}
								>
									{index + 1}
								</button>
							))}
						</div>
					</>
				)}
			</Fragment>
		);
};

export default Coins;
