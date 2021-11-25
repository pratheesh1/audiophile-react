import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <ProductProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Card />} />
          </Routes>
        </ProductProvider>
      </UserProvider>
      <Footer />
    </>
  );
}

export default App;
