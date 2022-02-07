import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filter from "../../components/Filter";
import FilteredProducts from "../../components/FilteredProducts";
import Header from "../../components/Header";
import { addProducts } from "../../slices/basketSlice";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";

const AllProducts = ({ products }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addProducts(products));
	});

	return (
		<>
			<Head>
				<title>All Products | Amazon</title>
			</Head>
			<Header products={products} />
			{/* HOME/PRODUCT PART (FOR BETTER NAVIGATION UX) */}
			{/* PADDING AND MARGIN UPDATED!!! */}
			<div className="bg-gray-200 p-6 mb-6">
				<div className="max-w-screen-xl mx-auto">
					<span className="font-medium">
						<Link href="/">Home</Link>
					</span>{" "}
					/ <span className="text-yellow-500"> Products</span>
				</div>
			</div>
			<main className="max-w-screen-xl mx-auto mt-5">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-3/12 w-full mb-5 px-5">
						<Filter />
					</div>
					<div className="md:w-9/12 w-full mb-5 px-5">
						<FilteredProducts />
					</div>
				</div>
			</main>

			<BackToTop />
			<Footer />
		</>
	);
};

export default AllProducts;

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
