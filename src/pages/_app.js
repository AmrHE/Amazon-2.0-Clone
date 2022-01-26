import { Provider } from "react-redux";
import { store } from "../app/store";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
};

export default MyApp;
