import Product from "./Product";

const ProductFeed = ({ products }) => {
	return (
		<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
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

			{products.slice(0, 4).map((product) => (
				<Product key={product.id} product={product} />
			))}
			<img
				className="md:col-span-full"
				src="https://links.papareact.com/dyz"
				alt=""
			/>
			{/* <div className="md:col-span-2"> */}
			<div className="md:col-span-2">
				{products.slice(4, 5).map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
			{products.slice(5, products.length).map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductFeed;
