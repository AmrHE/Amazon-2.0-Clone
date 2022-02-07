import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/solid";

import Header from "../../components/Header";
import styles from "../../styles/Product.module.css";
import Currency from "react-currency-formatter";
import QuantityCount from "../../components/QuantityCount/QuantityCount";
import Product from "../../components/Product";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import { addToBasket } from "../../slices/basketSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
	const dispatch = useDispatch();
	const { id, title, price, image, description, rating, category } = product;

	// console.log(product);
	// console.log(products);

	const [quantity, setQuantity] = useState(1);

	const notify = () =>
		toast("Item added to your cart successfully", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const handleAddToCart = (e) => {
		e.preventDefault();
		//Dispach the addToBasket action
		//So we can send the product to the basketSlice of the store
		dispatch(addToBasket({ ...product, title: product.title, quantity }));
		notify();
	};

	return (
		<>
			<Head>
				<title>{title} | Amazon</title>
			</Head>
			<Header products={products} />
			{/* HEADER */}
			<div className="bg-gray-200 p-10 mb-10">
				<div className="max-w-screen-xl mx-auto">
					<span className="font-medium">
						<Link href="/">Home</Link>
					</span>{" "}
					/{" "}
					<span className="font-medium">
						<Link href="/products">Products</Link>
					</span>{" "}
					/ <span className="text-yellow-500">{product.title}</span>
				</div>
			</div>
			{/* PRODUCT INFO */}
			<main className="max-w-screen-xl mx-auto mt-5">
				<div className="flex flex-wrap">
					<div className="px-5 mb-7 w-full md:w-7/12">
						<div className="w-full mb-4">
							<Image
								className={"w-full rounded-lg" + styles.product_image}
								width={700}
								height={500}
								objectFit="contain"
								src={image}
								alt="Product Image"
							/>
						</div>
					</div>
					<div className="px-5 mb-10 w-full md:w-5/12">
						<p className="text-xl italic text-gray-400">
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</p>
						<h1 className="my-2 text-5xl text-yellow-500 mb-5">{title}</h1>
						<p className="text-gray-600 text-base mb-5">{description}</p>
						<p className="flex items-center">
							<b className="mr-1">Rating:</b>
							{Array(Math.round(rating.rate))
								.fill()
								.map((_, i) => (
									<StarIcon key={i} className="h-5 text-yellow-500" />
								))}
							<span>({rating.count})</span>
						</p>
						<p>
							<b>Stock:</b> Available in stock
						</p>
						<p className="text-yellow-500 text-2xl mb-7 mt-5">
							<Currency quantity={price} />
						</p>
						<QuantityCount setQuantity={setQuantity} quantity={quantity} />
						<button className="button w-full mt-4" onClick={handleAddToCart}>
							Add To Cart
						</button>
						<ToastContainer />
					</div>
				</div>
			</main>

			<div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
				<div className="max-w-screen-2xl mx-auto">
					<h1 className="text-yellow-500 text-3xl mb-7 ml-7 italic">
						Related Products
					</h1>
					<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{products &&
							products
								.filter((product) => product.category === category)
								.map((product) => (
									<Product
										key={product.id}
										id={product.id}
										title={product.title}
										price={product.price}
										description={product.description}
										category={product.category}
										image={product.image}
										rating={product.rating}
										products={products}
									/>
								))}
					</div>
				</div>
			</div>

			<BackToTop />
			<Footer />
		</>
	);
};

export default ProductDetails;

export const getStaticPaths = async () => {
	const products = await fetch("https://fakestoreapi.com/products").then(
		(response) => response.json()
	);

	const paths = products.map((product) => {
		return {
			params: { id: product.id.toString() },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export async function getStaticProps(context) {
	const id = context.params.id;

	const products = await fetch("https://fakestoreapi.com/products").then(
		(response) => response.json()
	);
	const session = await getSession(context);
	const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
		(res) => res.json()
	);
	// https://fakestoreapi.com/products
	return {
		props: {
			product,
			session,
			products,
		},
	};
}
