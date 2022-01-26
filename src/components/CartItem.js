import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CartItem = ({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
	isPrime,
}) => {
	const dispatch = useDispatch();

	const handleAddToCart = (e) => {
		// INSTEAD OF ADDING THE ITEM TWICE IN THE CART,
		//TODO IMPLEMENT THE (+,-) COUNTER ALONG WITH THE QUALNTITY FOR EACH ITEM
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

	const handleRemoveFromCart = (e) => {
		e.preventDefault();
		dispatch(removeFromBasket({ id }));
	};
	return (
		<div className="grid grid-cols-5">
			{/* LEFT COLUMN (image) */}
			<Image src={image} height={200} width={200} objectFit="contain" />

			{/* MIDDLE COLUMN (DETAILS) */}
			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<div className="flex">
					{Array(Math.round(rating.rate))
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
				</div>

				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<Currency quantity={price} currency="USD" />

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
			{/* //TODO Change this button below to buy now */}
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button className="button" onClick={handleAddToCart}>
					Add to Cart
				</button>
				<button className="button" onClick={handleRemoveFromCart}>
					Remove Item
				</button>
			</div>
		</div>
	);
};

export default CartItem;
