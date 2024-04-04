import { useState, Fragment, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
	const location = useLocation();
	const [search, setSearch] = useState("");
	const [apiData, setApiData] = useState("");

	useEffect(() => {
		let timerID;
		// fetching data from the target API
		const SearchResult = async () => {
			try {
				const { data } = await axios.get(
					`https://api.coingecko.com/api/v3/search?query=${search}`
				);
				console.log(data);
				setApiData(data);
			} catch (error) {
				console.log(error);
			}
		};
		const FinalDelayedResult = () => {
			clearTimeout(timerID);
			timerID = setTimeout(SearchResult, 2000);
		};

		FinalDelayedResult();
		return () => clearTimeout(timerID);
	}, [search]);

	// // 	state updates in React are asynchronous, so the updated value of apiData may not be available
	// immediately after calling setApiData.
	// // To ensure that you're logging the updated value of apiData,
	// you can use a useEffect hook with apiData as a dependency.

	useEffect(() => {
		console.log(apiData);
	}, [apiData]);

	const InputChangeHandler = (e) => {
		setSearch(e.target.value);
	};

	return (
		<Fragment>
			<header className="w-full h-16 bg-black flex justify-evenly items-center">
				<div>Crypto Hub</div>
				<div>
					<input
						type="text"
						placeholder="search..."
						value={search}
						onChange={InputChangeHandler}
					/>
				</div>
				{/* Handling Search data */}
				{/* <div>
					{apiData.map((item, index) => (
						<div key={index}>
							{item.coins.map((coinItem) => (
								<div key={coinItem.id}>{coinItem.id}</div>
							))}
						</div>
					))}
				</div> */}
				<div>
					<span className="text-white"></span>
					{apiData !== "" &&
						apiData.coins.map((item) => (
							<span
								className="text-white"
								key={item.id}
							>
								{item.name}
							</span>
						))}
				</div>
				{/* NAvigation menu */}
				<div>
					<NavLink
						to="/"
						className={`${
							location.pathname === "/"
								? "text-orange-400"
								: "text-white"
						}`}
					>
						Home
					</NavLink>
					<NavLink
						to="/coins"
						className={`${
							location.pathname === "/coins"
								? "text-orange-400"
								: "text-white"
						}`}
					>
						Coins
					</NavLink>
					<NavLink
						to="/exchanges"
						className={`${
							location.pathname === "/exchanges"
								? "text-orange-400"
								: "text-white"
						}`}
					>
						Exchanges
					</NavLink>
				</div>
			</header>
		</Fragment>
	);
};

export default Header;

// tried different approach

// useEffect(() => {
// 	const SearchResult = () => {
// 		try {
// 			const timerID = setTimeout(async () => {
// 				const { data } = await axios.get(
// 					`https://api.coingecko.com/api/v3/search?query=${search}`
// 				);
// 				console.log(data);
// 				return () => clearTimeout(timerID);
// 			}, 3000);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	SearchResult();
// }, [search]);

// const HandleSearchChange = (e) => {
// 	const inputValue = e.target.value;
// 	let searchValue;
// 	clearTimeout(searchValue);
// 	searchValue = () => {
// 		setTimeout(() => {
// 			setSearch(inputValue);
// 		}, 2000);
// 	};
// };
