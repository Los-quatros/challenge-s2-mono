import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ResetPassword = lazy(() => import("./ResetPassword"));
const NewPassword = lazy(() => import("./NewPassword"));
const Register = lazy(() => import("./Register"));
const Account = lazy(() => import("../pages/account/AccountPage"));
const Home = lazy(() => import("../pages/HomePage.js"));
const Categories = lazy(() => import("../pages/CategoriesPage"));
const ProductDetails = lazy(() =>
  import("../pages/products/ProductDetailsPage")
);

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/register/:role" element={<Register />} />
      <Route path="/account/:page" element={<Account />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password/:token" element={<NewPassword />} />
    </Routes>
  );
};

export default Router;
