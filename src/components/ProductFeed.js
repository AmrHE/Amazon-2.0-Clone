import Product from "./Product";

const ProductFeed = ({ products }) => {
	return (
		<div>
			<h1>Products Here...</h1>
			{/* {products.map(
				({ id, title, price, description, category, image, rating }) => (
					<Product
						key={id}
						title={title}
						price={price}
						description={description}
						category={category}
						image={image}
						rating={rating}
					/>
				)
			)} */}
			{products.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductFeed;
