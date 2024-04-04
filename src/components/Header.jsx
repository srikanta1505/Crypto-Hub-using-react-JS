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
			timerID = setTimeout(SearchResult, 1000);
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
			<header className=" text-white w-full px-10 h-16 bg-gray-600 flex justify-between items-center">
				<div className="font-extrabold text-2xl">Crypto Hub</div>
				<div>
					<input
						className="h-9 pl-4 w-96 outline-none text-gray-600 border-2 border-solid border-gray-400 rounded-l-full"
						type="text"
						placeholder="search..."
						value={search}
						onChange={InputChangeHandler}
					/>
					{search === "" ? (
						<span className="inline-block cursor-pointer font-bold outline-none h-9 w-12 pl-2 text-xl border-2 border-solid rounded-r-full bg-gray-500 border-gray-500">
							🔍
						</span>
					) : (
						<span className=" inline-block cursor-pointer font-bold outline-none h-9 w-12 pl-3 text-xl border-2 border-solid rounded-r-full bg-gray-500 border-gray-500">
							X
						</span>
					)}
				</div>

				{/* <div>
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
				</div> */}
				{/* NAvigation menu */}
				<div className="flex flex-wrap justify-between gap-4 items-center text-xl font-bold mr-5">
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
			<div className=" flex items-center justify-center">
				{apiData !== "" && (
					<div className=" fixed top-14 left-1/3 flex justify-center mt-2 items-center flex-wrap h-96 w-96 overflow-auto rounded-md ">
						{apiData.coins.map((item) => (
							<div
								className="flex justify-start items-center gap-5 h-9 w-96 bg-gray-600 z-50 text-white hover:bg-gray-500
								"
								key={item.id}
							>
								<img
									src={item.thumb}
									className="h-4 w-4 "
								/>
								<span>{item.id}</span>
							</div>
						))}
					</div>
				)}
			</div>
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
