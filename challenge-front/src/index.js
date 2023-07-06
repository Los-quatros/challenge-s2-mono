import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
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
);
