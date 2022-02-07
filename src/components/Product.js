import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { Fade } from "react-reveal";
import { EyeIcon } from "@heroicons/react/outline";
import QuickView from "./QuickView";
import styles from "../styles/Product.module.css";
import { useRouter } from "next/router";

const Product = ({
	// product,
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
	products,
}) => {
	// const { id, title, price, description, category, image, rating } = product;
	const dispatch = useDispatch();
	const router = useRouter();
	const [isPrime, setIsPrime] = useState(Math.random() < 0.5 ? true : false);

	const [showQuick, setShowQuick] = useState(false);

	const handleAddToCart = (e) => {
		e.preventDefault();
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			rating,
			isPrime,
			quantity: 1,
		};

		//Dispach the addToBasket action
		//So we can send the product to the basketSlice of the store
		dispatch(addToBasket(product));

		// TODO add React Toast Functionality When adding to the cart
	};

	return (
		<>
			<Fade bottom>
				<div
					className={
						"relative flex flex-col m-5 z-40 bg-white p-8 rounded-xl " +
						styles.loop_product
					}
					onClick={() => router.push(`/products/${id}`)}
				>
					<p className="absolute top-2 right-2	text-xs italic text-gray-400">
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</p>

					<div
						className={`relative rounded-lg ${styles.product_image_wrapper}`}
					>
						<Image
							loading="lazy"
							src={image}
							height={200}
							width={200}
							objectFit="contain"
							className={
								"cursor-pointer rounded-lg overflow-hidden w-full " +
								styles.loop_product_image
							}
						/>
						<div
							onClick={() => setShowQuick(true)}
							className={`rounded-lg cursor-pointer ${styles.product_image_overly}`}
						>
							<div
								className={`button rounded-lg ${styles.product_image_overly_button}`}
							>
								<span className="mr-2">Quick View</span>
								<EyeIcon className="h-6" />
							</div>
						</div>
					</div>

					<h4
						className="link my-3 font-bold"
						onClick={() => router.push(`/products/${id}`)}
					>
						{title}
					</h4>
					{/* <p>{rating.rate}</p> */}

					<div className="flex items-center">
						{Array(Math.round(rating.rate))
							.fill()
							.map((_, i) => (
								<StarIcon key={i} className="h-5 text-yellow-500" />
							))}
						<span> ({rating.count})</span>
					</div>

					<p className="text-xs my-2 line-clamp-2">{description}</p>

					<div className="mb-5">
						<Currency quantity={price} currency="USD" />
					</div>

					{isPrime && (
						<div className="flex items-center space-x-2 -mt-5">
							<img
								className="w-12"
								src="https://links.papareact.com/fdw"
								alt=""
							/>
							<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
						</div>
					)}
					<button onClick={handleAddToCart} className="mt-auto button">
						Add to Cart
					</button>
				</div>
			</Fade>
			{showQuick && (
				<QuickView setShowQuick={setShowQuick} id={id} products={products} />
			)}
		</>
	);
};

export default Product;
