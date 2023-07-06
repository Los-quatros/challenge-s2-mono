import { useEffect, useState } from "react";

import AddressesPage from "./AddressesPage";
import HeaderPage from "./HeaderPage";
import OrdersPage from "./OrdersPage";
// import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import ReturnsPage from "./ReturnsPage";
import SidebarPage from "./SidebarPage";
import { useParams } from "react-router-dom";

function AccountPage() {
  const { name } = useParams();
  const [menu, setMenu] = useState("");

  useEffect(() => {
    setMenu(name);
  }, [name]);

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <SidebarPage />
        <div id="content" className="p-4 p-md-5">
          <HeaderPage />
          {menu === "orders" && <OrdersPage />}
          {menu === "addresses" && <AddressesPage />}
          {/* {menu === "products" && <ProductsPage />} */}
          {menu === "returns" && <ReturnsPage />}
          {menu === "profile" && <ProfilePage />}
        </div>
      </div>
    </>
  );
}

export default AccountPage;
