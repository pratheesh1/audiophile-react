import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Card />} />
        <Route path="/" element={<div>Hello World</div>} />
      </Routes>
    </>
  );
}

export default App;
