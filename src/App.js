import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <ProductProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/home" element={<Card />} />
            <Route path="/404" element={<div className="h-screen">404</div>} />
          </Routes>
        </ProductProvider>
      </UserProvider>
      <Footer />
    </>
  );
}

export default App;
