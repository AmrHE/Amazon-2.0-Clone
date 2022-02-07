import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import { withRouter } from "next/router";
import Product from "../components/Product";
import Link from "next/link";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const Search = (props) => {
	// console.log(props);
	const { products } = props;
	const searchResults = JSON.parse(props.router.query.results);

	return (
		<div className="bg-gray-100">
			<Head>
				<title>Search Results || Amazon 2.0</title>
			</Head>
			<Header products={products} />

			<div className="bg-gray-200 p-6 mb-6">
				<div className="max-w-screen-xl mx-auto">
					<span>
						<p>
							You Searched For:{" "}
							<span className="text-yellow-500 font-medium">
								{props.router.query.searchTerm}
							</span>
						</p>
					</span>
				</div>
			</div>
			<div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{searchResults.length > 0 &&
					searchResults.map((result) => (
						<Product key={result.id} {...result} />
					))}
			</div>

			<BackToTop />
			<Footer />
		</div>
	);
};

export default withRouter(Search);

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
