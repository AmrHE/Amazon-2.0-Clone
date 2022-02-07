import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="bg-amazon_blue-light w-full">
			{/* TO BE GRID TO BE EDITED */}
			<div className="py-12 max-w-screen-xl mx-auto text-gray-200 px-4 grid sm:grid-cols-2 lg:grid-cols-4">
				<div className="mt-10 ml-5 lg:ml-0 lg:mt-0">
					<p className="font-bold text-lg text-white">Get To Know Us</p>
					<ul className="list-none p-0 m-0">
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Careers
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								About Amazon
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Amazon App Download
							</Link>
						</li>
					</ul>
				</div>

				<div className="mt-10 ml-5 lg:ml-0 lg:mt-0">
					<p className="font-bold text-lg text-white">Make Money With Us</p>
					<ul className="list-none p-0 m-0">
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Sell Products With Amazon
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Fullfillment by Amazon
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Wholesales
							</Link>
						</li>
					</ul>
				</div>

				<div className="mt-10 ml-5 lg:ml-0 lg:mt-0">
					<p className="font-bold text-lg text-white">Shop With Us</p>
					<ul className="list-none p-0 m-0">
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Your Account
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Your Orders
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Your Addresses
							</Link>
						</li>
					</ul>
				</div>

				<div className="mt-10 ml-5 lg:ml-0 lg:mt-0">
					<p className="font-bold text-lg text-white">Let Us Help You</p>
					<ul className="list-none p-0 m-0">
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Help
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Shipping & Delivery
							</Link>
						</li>
						<li className="link py-1">
							<Link
								className="focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-origin-90"
								href="#"
							>
								Returns & Replacements
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-solid border-gray-600 p-10 flex items-center">
				<div className="max-w-screen-md mx-auto">
					<Image
						src="https://links.papareact.com/f90"
						width={120}
						height={30}
						objectFit="contain"
						className="cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
