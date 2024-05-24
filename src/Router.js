import { Route, Routes } from "react-router-dom";
import ItemPage from "./pages/items";
import MarketPage from "./pages/market";
import HomePage from "./pages/home";
import ProductPage from "./pages/product";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Privacy from "./pages/privacy";
import Faq from "./pages/faq";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="items" element={<MarketPage />} />
      <Route path="items/:id" element={<ProductPage />} />
      <Route path="additem" element={<ItemPage />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="faq" element={<Faq />} />
    </Routes>
  );
}
