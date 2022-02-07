const BackToTop = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div className="bg-amazon_blue-lighter text-white hover:bg-amazon_blue-lightest">
			<button
				type="button"
				className="w-full p-4 focus:outline-none focus:ring-yellow-200 focus:ring-origin-10"
				onClick={scrollToTop}
			>
				Back To Top
			</button>
		</div>
	);
};

export default BackToTop;
