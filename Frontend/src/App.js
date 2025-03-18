import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Footer from "./Components/Footer";
import AdminPanel from "./pages/AdminPanel";
import ProductList from "./Components/ProductList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/administracion" element={<AdminPanel />} />
        <Route path="/admin/products" element={<ProductList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

