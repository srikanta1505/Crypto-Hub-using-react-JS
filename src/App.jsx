import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ErrorPage from "./components/ErrorPage.jsx";
const Community = lazy(() => import("./components/Community.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const Loader = lazy(() => import("./loader/Loader.jsx"));
const Coins = lazy(() => import("./pages/Coins.jsx"));
// import Coins from "./pages/Coins.jsx";
const Exchanges = lazy(() => import("./pages/Exchanges.jsx"));
const CoinInfo = lazy(() => import("./components/CoinInfo.jsx"));

const App = () => {
	return (
		<Router>
			<Header />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/coins"
						element={<Coins />}
					/>
					<Route
						path="/exchanges"
						element={<Exchanges />}
					/>
					<Route
						path="/coins/:id"
						element={<CoinInfo />}
					/>
					<Route
						path="/about"
						element={<About />}
					/>
					<Route
						path="/community"
						element={<Community />}
					/>
				</Routes>
			</Suspense>
			<Footer />
		</Router>
	);
};

export default App;
