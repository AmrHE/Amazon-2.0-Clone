import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

const Product = ({
	// id,
	// title,
	// price,
	// description,
	// category,
	// image,
	// rating,
	product,
}) => {
	const { id, title, price, description, category, image, rating } = product;

	return (
		<div>
			<p>{category}</p>

			<Image src={image} height={200} width={200} objectFit="contain" />
			<h4>{title}</h4>

			<div>
				<StarIcon className="h-5 text-yellow-400" />
			</div>
		</div>
	);
};

export default Product;
