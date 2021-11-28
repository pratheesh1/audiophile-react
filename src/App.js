import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Header />
          <ProductProvider>
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Listings />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/404"
                element={<div className="h-screen">404</div>}
              />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
      <Footer />
    </>
  );
}

export default App;
