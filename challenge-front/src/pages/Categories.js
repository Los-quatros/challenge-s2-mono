import { Navigate, useParams } from "react-router-dom";

import CameraPage from "./categories/CameraPage";
import HeadPhonePage from "./categories/HeadPhonePage";
import PhonePage from "./categories/TabletPage";
import TabletPage from "./categories/TabletPage";

function Categories() {
	const { category } = useParams();
	const categories = ["headphones", "tablets", "phones", "cameras"];

	if (!categories.includes(category)) {
		return <Navigate to="/" />;
	}

	return (
		<>
			{category === "headphones" && <HeadPhonePage />}
			{category === "tablets" && <TabletPage />}
			{category === "phones" && <PhonePage />}
			{category === "cameras" && <CameraPage />}
		</>
	);
}

export default Categories;
