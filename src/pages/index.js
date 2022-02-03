import Head from "next/head";
import { getSession } from "next-auth/react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon 2.0</title>
			</Head>

			{/* HEADER SECTION */}
			<Header />

			{/* BANNER + PRODUCT FEED (MAIN VIEW) */}
			<main className="max-w-screen-2xl mx-auto">
				{/* BANNER */}
				<Banner />
				{/* PRODUCT FEED */}
				<ProductFeed products={products} />
			</main>
		</div>
	);
}

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
