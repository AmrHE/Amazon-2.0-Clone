import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	// Configure one or more authentication providers
	secret: process.env.SECRET,

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),

		// ...add more providers here
	],

	theme: {
		colorScheme: "dark", // "auto" | "dark" | "light"
		// brandColor: "facc15", // Hex color code
		logo: "https://links.papareact.com/f90", // Absolute URL to image
	},
});
