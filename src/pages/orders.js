import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import db from "../../firebase";
import moment from "moment";
import Order from "../components/Order";

const Orders = ({ orders }) => {
	const { data: session } = useSession();
	console.log(orders);

	return (
		<div>
			<Header />
			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
					Your Orders
				</h1>
				{session ? (
					<h2 className="text-xl">{orders.length} Orders</h2>
				) : (
					<h2 className="text-xl">Please Sign in to see your orders</h2>
				)}

				<div className="mt-5 space-y-4">
					{orders?.map((order) => (
						<Order key={order.id} order={order} />
					))}
				</div>
			</main>
		</div>
	);
};

export default Orders;

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// GET the logged in user credentials
	const session = await getSession(context);

	if (!session)
		return {
			props: {},
		};

	// Get Orders From Firebase DB
	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	// Get Orders From Stripe
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);

	return {
		props: {
			orders,
			session,
		},
	};
}
