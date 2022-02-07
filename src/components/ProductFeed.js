import Product from "./Product";

const ProductFeed = ({ products }) => {
	//TODO Implement a Currency Selector in the Footer/Header

	return (
		<div className="z-30 relative max-w-screen-2xl grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
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
				<Product
					key={product.id}
					// product={product}
					// title={product.name}
					products={products}
					{...product}
				/>
			))}
			<img
				className="md:col-span-full"
				src="https://links.papareact.com/dyz"
				alt=""
			/>
			{/* <div className="md:col-span-2"> */}
			<div className="md:col-span-2">
				{products.slice(4, 5).map((product) => (
					<Product
						key={product.id}
						// product={product}
						products={products}
						{...product}
					/>
				))}
			</div>
			{products.slice(5, products.length).map((product) => (
				<Product
					key={product.id}
					// product={product}
					products={products}
					{...product}
				/>
			))}
		</div>
	);
};

export default ProductFeed;
