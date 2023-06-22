import { Navigate, useParams } from "react-router-dom";

import HeadPhonePage from "./categories/HeadPhonePage";

function Categories() {
	const { category } = useParams();
	const categories = ["headphones", "tablets", "phones", "cameras"];

	if (!categories.includes(category)) {
		return <Navigate to="/" />;
	}

	return (
		<>
			{category === "headphones" && <HeadPhonePage />}
			{category === "tablets" && <HeadPhonePage />}
			{category === "phones" && <HeadPhonePage />}
			{category === "cameras" && <HeadPhonePage />}
		</>
	);
}

export default Categories;
