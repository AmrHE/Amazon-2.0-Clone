import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../slices/basketSlice";
import Product from "../components/Product";

const FilteredProducts = () => {
	const products = useSelector(selectFilteredProducts);

	return (
		<>
			{products && (
				<p className="mb-4 font-bold text-xl text-gray-500">
					{products.length} Products Found
				</p>
			)}
			<div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{products?.length &&
					products.map((product) => (
						<Product products={products} key={product.id} {...product} />
					))}
			</div>
		</>
	);
};

export default FilteredProducts;
