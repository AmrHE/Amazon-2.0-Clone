import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ product }) => {
	const dispatch = useDispatch();

	const { id, title, price, description, category, image, rating } = product;
	const [isPrime, setIsPrime] = useState(Math.random() < 0.5 ? true : false);

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
		};

		//Dispach the addToBasket action
		//So we can send the product to the basketSlice of the store
		dispatch(addToBasket(product));
	};

	return (
		<div className="relative flex flex-col m-5 bg-white z-30 p-10">
			<p className="absolute top-2 right-2	text-xs italic text-gray-400">
				{category}
			</p>

			<Image src={image} height={200} width={200} objectFit="contain" />
			<h4 className="my-3">{title}</h4>
			{/* <p>{rating.rate}</p> */}

			<div className="flex">
				{Array(Math.round(rating.rate))
					.fill()
					.map((_, i) => (
						<StarIcon key={i} className="h-5 text-yellow-500" />
					))}
			</div>

			<p className="text-xs my-2 line-clamp-2">{description}</p>

			<div className="mb-5">
				<Currency quantity={price} currency="USD" />
			</div>

			{isPrime && (
				<div className="flex items-center space-x-2 -mt-5">
					<img className="w-12" src="https://links.papareact.com/fdw" alt="" />
					<p className="text-xs text-gray-500">FREE Next-dat Delivery</p>
				</div>
			)}
			<button onClick={handleAddToCart} className="mt-auto button">
				Add to Cart
			</button>
		</div>
	);
};

export default Product;
