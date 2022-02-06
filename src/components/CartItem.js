import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import QuantityCount from "./QuantityCount/QuantityCount";

const CartItem = ({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
	isPrime,
	quantity,
}) => {
	const dispatch = useDispatch();
	const [quantityUp, setQuantityUp] = useState(quantity);

	// const handleAddToCart = (e) => {
	// 	// INSTEAD OF ADDING THE ITEM TWICE IN THE CART,
	// 	e.preventDefault();
	// 	const product = {
	// 		id,
	// 		title,
	// 		price,
	// 		description,
	// 		category,
	// 		image,
	// 		rating,
	// 		isPrime,
	// 	};
	// 	//Dispach the addToBasket action
	// 	//So we can send the product to the basketSlice of the store
	// 	dispatch(addToBasket(product));
	// };

	const handleRemoveFromCart = (e) => {
		e.preventDefault();
		dispatch(removeFromBasket({ id }));
	};
	return (
		<div className="grid grid-cols-5 p-4 mb-8 border-2 border-yellow-100 rounded-lg">
			{/* LEFT COLUMN (image) */}
			<Image src={image} height={200} width={200} objectFit="contain" />

			{/* MIDDLE COLUMN (DETAILS) */}
			<div className="col-span-3 mx-5">
				<p className="font-bold">{title}</p>
				<div className="flex items-center">
					{Array(Math.round(rating.rate))
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
					{"  "}
					<span> ({rating.count})</span>
				</div>
				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<div className="text-gray-400">
					<Currency quantity={price} currency="USD" /> {" * "} {quantity}{" "}
					<Currency quantity={price * quantity} />
				</div>
				{isPrime && (
					<div className="flex items-center space-x-2">
						<img
							src="https://links.papareact.com/fdw"
							className="w-12"
							loading="lazy"
							alt=""
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>

			{/* RIGHT COLUMN (BUTTONS) */}
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<QuantityCount
					id={id}
					dispatch
					setQuantity={setQuantityUp}
					quantity={quantityUp}
				/>
				<button className="button" onClick={handleRemoveFromCart}>
					Remove Item
				</button>
			</div>
		</div>
	);
};

export default CartItem;
