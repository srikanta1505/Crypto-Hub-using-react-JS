import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import MarketDetails from "./MarketDetails";

const CoinInfo = () => {
	const params = useParams();

	const [coinInfo, setCoinInfo] = useState(null);
	const [currency, setCurrency] = useState("inr");
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(false);

	const DropDownHandler = (e) => {
		setCurrency(e.target.value);
	};

	const currencySymbol =
		currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

	useEffect(() => {
		const getCoinInfo = async () => {
			const api = "https://api.coingecko.com/api/v3";
			try {
				const { data } = await axios.get(`${api}/coins/${params.id}`);
				console.log(data);
				setCoinInfo(data);
				setLoader(false);
			} catch (error) {
				setError(true);
				setLoader(false);
			}
		};
		getCoinInfo();
	}, [params.id]);

	if (error)
		return (
			<ErrorPage
				messages={
					"Error occoured while loading the chart and other details"
				}
			/>
		);
	else
		return (
			<>
				{loader ? (
					<Loader />
				) : (
					<div>
						{/* MAking the currency selection DropDown */}
						<div className="text-right mx-20 my-5">
							<label htmlFor="currency">Selected Currency </label>
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

						{/* Handling data Like image, name,id, change in price % */}
						<div className="flex justify-evenly flex-wrap font-bold mt-5 text-center">
							<div>
								<img
									className=" h-32 w-32 "
									src={coinInfo.image.large}
									alt={coinInfo.id}
								/>
								<p className="pt-5">24h Changes</p>
								{coinInfo.market_data
									.price_change_percentage_24h > 0 ? (
									<p className="text-green-400 ">
										{
											coinInfo.market_data
												.price_change_percentage_24h
										}
										%
									</p>
								) : (
									<p className="text-red-500">
										{
											coinInfo.market_data
												.price_change_percentage_24h
										}
										%
									</p>
								)}
							</div>
							<div className="text-center pt-5 text-xl font-medium">
								<p className="mt-5 font-bold text-3xl">
									{coinInfo.name} {`(${coinInfo.symbol})`}
								</p>

								<p className="mt-5">
									Rank: #{coinInfo.market_cap_rank}
								</p>
								<p className="mt-5">
									Current_Price:{" "}
									{
										coinInfo.market_data.current_price[
											currency
										]
									}{" "}
									{currencySymbol}
								</p>
								<p></p>
							</div>
						</div>

						{/* Showing Time details when the last updated has done  */}
						<p className="text-center mt-10 font-medium opacity-60">
							{`( Last Updated on${" "}
							${Date(coinInfo.market_data.last_updated).split("G")[0]}
							)`}
						</p>

						{/* Displaying chnages in 24 h  */}
						<div className="flex justify-around opacity-80 flex-wrap font-medium mt-5 text-center">
							<p className="text-green-600 pt-5">
								Highest price(24h) : {currencySymbol}{" "}
								<span className="text-green-600 ">
									{coinInfo.market_data.high_24h[currency]}
								</span>
							</p>
							<p className="text-red-600 pt-5">
								Lowest price(24h) : {currencySymbol}{" "}
								<span className="text-red-600">
									{coinInfo.market_data.low_24h[currency]}
								</span>
							</p>
						</div>

						{/* Showing Market data,volume and other Datails */}
						<div className="font-medium text-left opacity-80">
							<MarketDetails
								item={"All Time High"}
								value={`${currencySymbol}${" "} ${
									coinInfo.market_data.ath[currency]
								}`}
							/>
							<MarketDetails
								item={"All Time Low"}
								value={`${currencySymbol}${" "} ${
									coinInfo.market_data.atl[currency]
								}`}
							/>
							<MarketDetails
								item={"Max Supply"}
								value={coinInfo.market_data.circulating_supply}
							/>
							<MarketDetails
								item={"Circulating Supply"}
								value={coinInfo.market_data.max_supply}
							/>
							<MarketDetails
								item={"Market Capitalization"}
								value={`${currencySymbol}${" "}${
									coinInfo.market_data.market_cap[currency]
								}`}
							/>
						</div>
						{/* Showing crypto coin details */}
						<div className="ml-20">
							<div className="font-bold text-3xl mb-4">
								Description
							</div>
							<div className="px-10 mb-16">
								{coinInfo.description.en}
							</div>
						</div>
					</div>
				)}
			</>
		);
};

export default CoinInfo;
