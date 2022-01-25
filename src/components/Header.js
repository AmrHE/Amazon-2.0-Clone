import Image from "next/image";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import freeShippingImg from "../assets/images/freeShipping.jpg";
const Header = () => {
	return (
		<header>
			{/* TOP HEADER SECTION STARTS*/}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
				{/* LOGO */}
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						alt="LOGO"
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>

				{/* SEARCH BAR */}
				<div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
					<input
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
						type="text"
					/>
					<SearchIcon className="h-12 p-4" />
				</div>

				{/*RIGHT PART*/}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div className="link">
						<p>Hello Amr Hassan</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div className="link">
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>
					<div className="relative link flex items-center">
						<span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
							0
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
			<div className="flex items-center space-x-6 xl:space-x-8 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
				<p className="link flex items-center">
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
