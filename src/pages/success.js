import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { getSession } from "next-auth/react";

const Success = ({ products }) => {
	const router = useRouter();
	return (
		<div className="bg-gray-100 h-screen">
			<Header products={products} />
			<main className="max-w-screen-lg mx-auto">
				<div className="flex flex-col p-10 bg-white">
					<div className="flex items-center space-x-2 mb-5">
						<CheckCircleIcon className="text-green-500 h-10" />
						<h1 className="text-3xl">
							Thank you, your order has been confirmed!
						</h1>
					</div>
					<p>
						Thank you for shopping with us, We'll send a confirmation email to
						yoo once your order is shipped, If you would like to check your
						order(s), please use the link below.
					</p>
					<button
						onClick={() => router.push("/orders")}
						className="button mt-8"
					>
						Go to my orders
					</button>
				</div>
			</main>
			<BackToTop />
			<Footer />
		</div>
	);
};

export default Success;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const products = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);
	// https://fakestoreapi.com/products
	return {
		props: {
			products,
			session,
		},
	};
}
