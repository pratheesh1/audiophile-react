import { Route, Routes, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <Header />
            <OrderProvider>
              <Routes>
                <Route path="/" element={<Listings />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </OrderProvider>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
      <Footer />
    </>
  );
}

export default App;
