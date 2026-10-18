import { Route, Routes } from "react-router-dom"
import SiteLayout from "./components/layout/SiteLayout"
import AboutPage from "./pages/AboutPage"
import AccountPage from "./pages/AccountPage"
import CategoriesPage from "./pages/CategoriesPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import ContactPage from "./pages/ContactPage"
import HelpPage from "./pages/HelpPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import PrivacyPage from "./pages/PrivacyPage"
import ProductPage from "./pages/ProductPage"
import ShopPage from "./pages/ShopPage"
import TermsPage from "./pages/TermsPage"

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
