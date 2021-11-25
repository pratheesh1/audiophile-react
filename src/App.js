import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <ProductProvider>
          <Routes>
            <Route path="/home" element={<Card />} />
            <Route path="/" element={<div>Hello World</div>} />
          </Routes>
        </ProductProvider>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
