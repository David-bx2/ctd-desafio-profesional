import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./pages/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Footer from "./Components/Footer";
import AdminPanel from "./pages/AdminPanel";
import ProductList from "./Components/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FeatureList from "./Components/FeatureList";
import EditProduct from "./Components/EditProduct";
import AddCategory from "./Components/AddCategory";
import Favorites from "./pages/Favorites";
import ReserveForm from "./Components/ReserveForm";
import ReservationDetail from "./Components/ReservationDetail";
import MyBookings from "./pages/MyBookings";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  return (
    <Router>
      <Header user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/reserve/:id" element={<ReserveForm />} />
        <Route path="/reservation-detail" element={<ReservationDetail />} />
        <Route path="/admin/add-product" element={user?.isAdmin ?<AddProduct />: <Navigate to="/" />} />
        <Route
  path="/admin"
  element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />}
/>
        <Route path="/admin/products" element={user?.isAdmin ?<ProductList />: <Navigate to="/" />} />
        <Route
          path="/admin/features"
          element={user?.isAdmin ? <FeatureList /> : <Navigate to="/" />}
        />
        <Route path="/admin/edit-product/:id" element={user?.isAdmin ?<EditProduct /> : <Navigate to="/" />} />
        <Route path="/admin/categorias" element={user?.isAdmin ?<AddCategory />: <Navigate to="/" />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-bookings" element={<MyBookings />} />¿
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

