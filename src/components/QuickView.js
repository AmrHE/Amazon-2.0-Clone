import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket } from "../slices/basketSlice";
import QuantityCount from "./QuantityCount/QuantityCount";
import styles from "../styles/Product.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuickView = ({ setShowQuick, id, products }) => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const router = useRouter();

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

	useEffect(() => {
		const item = products.filter((product) => product.id == id)[0];
		setProduct(item);
		// console.log(item);
		// console.log(products);
	}, [id]);
	return (
		<>
			<div
				className={
					"fixed w-full h-screen md:h-auto top-0 left-0 md:-top-36 flex justify-center items-start overflow-y-scroll " +
					styles.quickView
				}
				style={{ zIndex: "1200" }}
			>
				<div
					className={`relative max-w-screen-xl my-48 mb-20 rounded-lg ${styles.quickView_wrapper}`}
					style={{ zIndex: "200" }}
				>
					<div className="flex flex-wrap mt-5">
						<div className="px-5 mb-7 w-full md:w-7/12 ">
							<div className="w-full mb-4 overflow-hidden rounded-lg h-auto">
								{product && (
									<img
										loading="lazy"
										className={
											"w-full rounded-lg h-full width " +
											styles.quickView_product_image_new
										}
										// style={{ maxWidth: "500px" }}
										src={product?.image}
									/>
								)}
							</div>
						</div>
						<div className="px-5 mb-5 w-full md:w-5/12 ">
							<p className="text-xl text-black">{product?.category}</p>
							<h1 className="my-2 text-5xl text-yellow-500 mb-7">
								{product?.title}
							</h1>
							<p className="text-gray-600 text-base mb-5">
								{product?.description}
							</p>
							<p className="flex items-center">
								<b className="mr-1">Rating:</b>{" "}
								{product.rating &&
									Array(Math.round(product?.rating?.rate))
										.fill()
										.map((_, i) => (
											<StarIcon key={i} className="h-5 text-yellow-500" />
										))}
								{product.rating && <span>({product?.rating?.count})</span>}
							</p>
							<p>
								<b>Stock:</b> Available in stock
							</p>
							<p className="text-yellow-500 text-2xl mb-7">
								<Currency quantity={product.price} />
							</p>
							{product.isPrime && (
								<div className="flex items-center space-x-2 -mt-5">
									<img
										className="w-12"
										src="https://links.papareact.com/fdw"
										alt=""
									/>
									<p className="text-xs text-gray-500">
										FREE Next-day Delivery
									</p>
								</div>
							)}
							<QuantityCount setQuantity={setQuantity} quantity={quantity} />
							<button onClick={handleAddToCart} className="w-full button mt-4">
								Add to cart
							</button>
							<button
								onClick={() => router.push("/products/" + product?.id)}
								className="w-full button mt-4"
							>
								View details
							</button>
							<ToastContainer />
						</div>
					</div>
				</div>
				<div
					onClick={() => setShowQuick(false)}
					className="w-full h-screen bg-gray-900 bg-opacity-60 fixed top-0 right-0 cursor-pointer"
					style={{ zIndex: "100" }}
				/>
			</div>
		</>
	);
};

export default QuickView;
