import Image from "next/image";
import { useState } from "react";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import Link from "next/link";
import Currency from "react-currency-formatter";
import { useEffect } from "react";

// import freeShippingImg from "../assets/images/freeShipping.jpg";

// TODO Add THe FreeShipping Badge
// TODO  Add login form and implement it's functionality and restyle the login proviers page & icons
// TODO Implement Humburger Menu
// TODO Implement Bookmarks Functionality

const Header = ({ products }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const items = useSelector(selectItems);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	// console.log("Procuts: ", products);
	// console.log("Search Results: ", searchResults);

	const handleSearch = (e) => {
		let query = e.target.value;
		query = query.toLowerCase();
		setSearchTerm(query);
		setSearchResults(
			products.filter(
				(product) =>
					product.title.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query) ||
					product.category.toLowerCase().includes(query)
			)
		);
	};

	const handlePressEnter = (e) => {
		if (e.key === "Enter") {
			// console.log("Enter presses");
			let query = e.target.value;
			query = query.toLowerCase();
			setSearchTerm(query);
			setSearchResults(
				products.filter(
					(product) =>
						product.title.toLowerCase().includes(query) ||
						product.description.toLowerCase().includes(query) ||
						product.category.toLowerCase().includes(query)
				)
			);
			router.push({
				pathname: "/search",
				query: {
					results: JSON.stringify(searchResults),
					searchTerm: searchTerm,
				},
			});
		}
	};

	return (
		<header>
			{/* TOP HEADER SECTION STARTS*/}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
				{/* LOGO */}
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						onClick={() => router.push("/")}
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						alt="LOGO"
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>

				{/* SEARCH BAR */}
				<div className="hidden relative sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
					<input
						onMouseOver={() => setShowResults(true)}
						onBlur={() => setShowResults(false)}
						onFocus={() => setShowResults(true)}
						onKeyPress={handlePressEnter}
						value={searchTerm}
						onChange={handleSearch}
						placeholder="Search anything you need... (Live Search)"
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
						type="text"
					/>
					<SearchIcon
						className="h-12 p-4"
						onClick={() =>
							router.push({
								pathname: "/search",
								query: {
									results: JSON.stringify(searchResults),
									searchTerm: searchTerm,
								},
							})
						}
					/>

					{showResults && (
						<div
							onClick={() => setShowResults(true)}
							onMouseOver={() => setShowResults(true)}
							onMouseLeave={() => setShowResults(false)}
							className="absolute w-full bg-white bottom-0 z-50 rounded-md"
							style={{
								transform: "translateY(100%)",
								height: "auto",
								maxHeight: "400px",
								overflowY: "auto",
							}}
						>
							{searchResults?.length ? (
								searchResults.map(({ id, title, price, category }) => (
									<div
										key={id}
										className="p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50"
									>
										<Link href={`/products/${id}`}>
											<h5 className="font-medium text-sm text-gray-600">
												{title}
											</h5>
										</Link>
										<Link href={`/products/${id}`}>
											<p className="text-xs text-gray-400">
												{category}
												<Currency quantity={price} />
											</p>
										</Link>
									</div>
								))
							) : (
								<>
									{searchTerm && (
										<p className="text-xs text-gray-400 text-center py-2">
											No product found
										</p>
									)}
								</>
							)}
						</div>
					)}
				</div>

				{/*RIGHT PART*/}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div
						onClick={!session ? signIn : signOut}
						className="cursor-pointer link"
					>
						<p>{session ? `Hello, ${session.user.name}` : "Hello, Sign In"}</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div
						onClick={() => router.push("/orders")}
						className="cursor-pointer link"
					>
						<p className="font-extrabold md:text-sm">Orders</p>
					</div>
					<div
						onClick={() => router.push("/checkout")}
						className="cursor-pointer relative link flex items-center"
					>
						<span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
							{items.length}
						</span>
						<ShoppingCartIcon className="h-10" />
						<p className="hidden md:inline font-extrabold md:text-sm mt-2">
							Cart
						</p>
					</div>
				</div>
			</div>
			{/* TOP HEADER SECTION ENDS*/}

			{/* BOTTOM HEADER SECTION STARTS */}
			<div
				onClick={() => router.push("/products")}
				className="flex items-center space-x-6 xl:space-x-8 p-2 pl-6 bg-amazon_blue-light text-white text-sm"
			>
				<p
					// TODO ADD THE PRODUCT LINK HERE AND UPDATE EACH CATEGORY WITH ITS CATEGORY FILTER
					className="link flex items-center"
				>
					<MenuIcon className="h-6 mr-1 flex" />
					All
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon Business</p>
				<p className="link">Today's Deals</p>
				<p className="link hidden lg:inline-flex">Electronics & Computer</p>
				<p className="link hidden lg:inline-flex">Food & Grocery</p>
				<p className="link hidden lg:inline-flex">Prime</p>
				<p className="link hidden lg:inline-flex">Buy Again</p>
				<p className="link hidden lg:inline-flex">Shopper Toolkit</p>
				<p className="link hidden lg:inline-flex">Health & Personal Care</p>
				{/* <div className="hidden lg:hidden md:inline-flex md:px-10 "> //TODO add free shipping on fullfilled by Amazon badge
					<Image
						// width={350}
						// height={100}
						objectFit="contain"
						className="p-0 m-0  cursor-pointer lg:h-full"
						src={freeShippingImg}
					></Image>
				</div> */}
			</div>
			{/* BOTTOM HEADER SECTION ENDS */}
		</header>
	);
};

export default Header;
