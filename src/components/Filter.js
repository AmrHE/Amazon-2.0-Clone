import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import {
	clearFilters,
	selectProducts,
	updateFilters,
} from "../slices/basketSlice";
import styles from "../styles/Product.module.css";
import "react-input-range/lib/css/index.css";

const Filter = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const [activeCategory, setActiveCategory] = useState("all");
	const [lastChange, setLastChange] = useState(null);
	const [showClear, setShowClear] = useState(false);
	const [price, setPrice] = useState(0);
	const [priceMax, setPriceMax] = useState(1);

	// console.log(allProducts);

	//ADD COMMENT HERE
	const getUniqueValues = (data, type) => {
		let unique = data.map((item) => item[type]);
		return ["all", ...new Set(unique)];
	};

	const categories = allProducts
		? getUniqueValues(allProducts, "category")
		: null;

	const filterCategories = (value, item) => {
		setShowClear(true);
		if (item === "category") {
			setActiveCategory(value);
			setLastChange("category");
		}
	};

	// UPDATED PEICE OF CODE TO BE CHECKED ON ERROR
	// FILTER allProducts BY CATEGORY
	useEffect(() => {
		// const items = ["category"];
		const item = "category";

		if (allProducts) {
			let filtered = allProducts;

			if (activeCategory !== "all") {
				filtered = allProducts.filter(
					(product) => product[lastChange] === activeCategory
				);
			} else {
				filtered == lastChange && activeCategory !== "all"
					? filtered.filter((product) => product["category"] === activeCategory)
					: filtered;
			}

			if (activeCategory !== "all") {
				filtered =
					activeCategory !== lastChange
						? filtered.filter(
								(product) => product["category"] === activeCategory
						  )
						: filtered;
			}
			dispatch(updateFilters(filtered));
		}
	}, [activeCategory, lastChange]);

	//SET THE MAXIMUM PRICE FOR ALL PRODUCTS TO UPDATE THE PRICE FILTER
	useEffect(() => {
		if (!allProducts) return false;

		const max = allProducts
			.map((product) => product.price)
			.reduce((a, b) => Math.max(a, b));

		setPriceMax(max);
		setPrice(max);
	}, [allProducts]);

	// CLEAR FILTERS HANDLER
	const clearAllFilters = () => {
		dispatch(clearFilters());
		setShowClear(false);
		setActiveCategory("all");
		setPrice(priceMax);
	};

	// PRICE FILTER HANDLER
	const priceFilter = (value) => {
		setPrice(value);
		const filtered = allProducts.filter((product) => product.price <= value);
		dispatch(updateFilters(filtered));
		setShowClear(true);
	};

	return (
		<div className="flex flex-col mt-10">
			<div className="mb-4">
				<h2 className="font-bold text-base text-gray-600">Categories</h2>
				<div className="flex flex-col my-5">
					{categories &&
						categories.map((category) => (
							<p
								key={category}
								className={`${
									category == activeCategory && styles.active_filter
								} text-gray-500 cursor-pointer mb-2`}
								onClick={() => filterCategories(category, "category")}
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</p>
						))}
				</div>
			</div>

			<div className="mb-4 pr-10">
				<h2 className="font-bold text-base text-gray-600">Price</h2>
				<div className="flex flex-col my-5">
					<InputRange
						maxValue={priceMax}
						minValue={0}
						value={price}
						formatLabel={(value) => `$ ${value}`}
						onChange={priceFilter}
					/>
				</div>
			</div>
			{/*  */}
			{showClear && (
				<button onClick={clearAllFilters} className="button w-full">
					Clear Filter
				</button>
			)}
		</div>
	);
};

export default Filter;
