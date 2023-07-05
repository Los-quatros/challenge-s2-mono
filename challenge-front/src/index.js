import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							refetchOnWindowFocus: false,
						},
					},
				})
			}
		>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
