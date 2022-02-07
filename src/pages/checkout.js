import Image from "next/image";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import {
	selectItems,
	selectTotal,
	selectTotalItems,
} from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { getSession, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
// import Product from "../components/Product";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const stripePromise = loadStripe(process.env.stripe_public_key);

//TODO Customize the Cart Page Styling and Background
const Checkout = ({ products }) => {
	const { data: session } = useSession();
	const items = useSelector(selectItems);
	const totalPrice = useSelector(selectTotal);
	const selectTotalItem = useSelector(selectTotalItems);
	const [categories, setCategories] = useState([]);

	// Function that create Stripe checkout session //handleCheckoutClick
	const createCheckoutSession = async () => {
		const stripe = await stripePromise;

		// call the backend to create a checkout Session...
		const checkoutSession = await axios.post("/api/create-checkout-session", {
			items,
			email: session.user.email,
		});

		//Redirect user/customer to checkout

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});

		if (result.error) alert(`${result.error.message}, Please try again later.`);
	};

	useEffect(() => {
		const allCategories = items.map((item) => item.category);
		const unique = [...new Set(allCategories)];
		setCategories(unique);
	}, [items]);

	return (
		<>
			<Head>
				<title>Checkout | Amazon</title>
			</Head>
			<div className="bg-gray-100">
				<Header products={products} />
				<main className="lg:flex max-w-screen-2xl mx-auto">
					{/* LEFT PART */}
					<div className="flex-grow m-5 shadow-sm">
						<Image
							src="https://links.papareact.com/ikj"
							width="1020"
							height="250"
							objectFit="contain"
						/>
						<div className="flex flex-col p-5 space-y-10 bg-white">
							<h1 className="text-3xl border-b pb-4">
								{items.length === 0
									? "Your Cart is Empty..."
									: "Your Shopping Cart"}
							</h1>

							<div className="mb-5">
								{categories.length &&
									categories.map((category) => (
										<div key={category}>
											<h1 className="text-xl pb-4 font-medium">
												{category.charAt(0).toUpperCase() + category.slice(1)}
											</h1>
											<div className="mb-14">
												{items.length &&
													items
														.filter((item) => item.category === category)
														.map((item) => (
															<CartItem key={item.id} {...item} />
														))}
											</div>
										</div>
									))}
							</div>
							{/* {items.map((item, i) => (
								<CartItem
									key={i}
									{...item}
									// id={item.id}
									// title={item.title}
									// price={item.price}
									// description={item.description}
									// category={item.category}
									// image={item.image}
									// rating={item.rating}
									// isPrime={item.isPrime}
									// quantity={item.quantity}
								/>
							))} */}
						</div>
					</div>

					{/* RIGHT PART */}
					<div className="flex flex-col bg-white p-10 shadow-md">
						{items.length > 0 && (
							<>
								<h2 className="whitespace-nowrap">
									Subtotal ({selectTotalItem} items):{" "}
									<span className="font-bold">
										<Currency quantity={totalPrice} currency="USD" />
									</span>
								</h2>
								<button
									role="link"
									onClick={createCheckoutSession}
									disabled={!session}
									className={`button mt-2 ${
										!session &&
										"from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
									}`}
								>
									{!session ? "Sign in to checkout" : "Proceed to checkout"}
								</button>
							</>
						)}

						{/* {items &&
							items.map((item) => (
								<Product className="flex-1" key={item.id} {...item} />
							))} */}
					</div>
				</main>
			</div>

			<BackToTop />
			<Footer />
		</>
	);
};

export default Checkout;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const products = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);
	// https://fakestoreapi.com/products
	return {
		props: {
			products,
			session,
		},
	};
}
