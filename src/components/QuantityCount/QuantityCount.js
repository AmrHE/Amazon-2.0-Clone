import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../slices/basketSlice";

const QuantityCount = ({
	setQuantity,
	quantity = 1,
	dispatch = false,
	id = null,
}) => {
	const newDispatch = useDispatch();
	// const [disabled, setDisabled] = useState(false);

	const disable = quantity === 1 ? true : false;

	const increamentCount = () => {
		setQuantity(quantity + 1);
		UpdateQuantityHere(quantity + 1);
	};

	const decreamentCount = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
			UpdateQuantityHere(quantity - 1);
		}
	};

	const UpdateQuantityHere = (count) => {
		if (dispatch) {
			const product = { id, quantity: count };
			newDispatch(updateQuantity(product));
		}
	};

	return (
		<div className="flex items-center">
			<button
				className={`button outline-none w-10 h-10 flex align-center bg-yellow-400 justify-center rounded-md	transition-all duration-300 font-bold hover:bg-yellow-500 ${
					disable && "cursor-not-allowed"
				}`}
				onClick={decreamentCount}
				disabled={quantity === 1 ? true : false}
			>
				-
			</button>
			<div className="min-w- flex justify-center self-center mx-3 my-0">
				{quantity}
			</div>
			<button
				className="button outline-none w-10 h-10 flex align-center bg-yellow-400 justify-center rounded-md	transition-all duration-300 font-bold hover:bg-yellow-500"
				onClick={increamentCount}
			>
				+
			</button>
		</div>
	);
};

export default QuantityCount;
