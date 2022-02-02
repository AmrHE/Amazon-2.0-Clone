const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { items, email } = req.body;

	// console.log(items);
	// console.log(email);

	//Convert the Items Array to the format that Stripe expects from us
	const transformedItems = items.map((item) => ({
		description: item.description,
		//TODO Update The quantity variable  down below if the quantity logic ((+,-) icons) is impmeneted
		quantity: 1,
		price_data: {
			currency: "usd",
			unit_amount: item.price * 100,
			product_data: {
				name: item.title,
				images: [item.image],
			},
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: [
			"shr_1KOKjIEg3kb7zoyYkQHpmA6X",
			// "shr_1KOKniEg3kb7zoyY46aXa8GL",
			// "shr_1KOKr7Eg3kb7zoyYNZAD2owt",
		],

		shipping_address_collection: {
			allowed_countries: [
				"US",
				"CA",
				"GB",
				"FR",
				"BR",
				"EG",
				"SO",
				"ES",
				"IT",
				"JP",
				"CN",
			],
		},
		line_items: transformedItems,
		mode: "payment",
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});

	res.status(200).json({
		id: session.id,
	});
};
