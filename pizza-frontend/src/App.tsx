import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import GetCustomers from "./components/customer/CustomersPage";
import GetPizza from "./components/pizza/GetPizza";
import OrderPage from "./components/order/OrderPage";
import UpdatePizza from "./components/pizza/UpdatePizza";
import AddPizza from "./components/pizza/AddPizza";
import SignUpForm from "./components/sign-up/SignUpForm";
import HomePage from "./components/home/HomePage";
import FetchPizza from "./components/pizza/FetchPizza";
import Login from "./components/login/Login";
import { CartProvider } from "./context/CartContext";
import MyOrders from "./components/order/MyOrders";
import UserProfile from "./components/profile/UserProfile";
import GetAdmin from "./components/customer/AdminsPage";
import UpdateUserProfile from "./components/profile/UpdateUserProfile";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <CartProvider>
          <Header />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>

              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-up" element={<SignUpForm />}></Route>

              <Route path="/pizza" element={<GetPizza />}></Route>
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/my-profile" element={<UserProfile />} />
              <Route path="/update-profile" element={<UpdateUserProfile />} />

              <Route path="/pizza-list" element={<FetchPizza />}></Route>
              <Route path="/order" element={<OrderPage />} />
              <Route path="/customer" element={<GetCustomers />}></Route>
              <Route path="/admin" element={<GetAdmin />}></Route>
              <Route path="/update-pizza/:pizzaId" element={<UpdatePizza />} />
              <Route path="/add-pizza" element={<AddPizza />} />
            </Routes>
          </div>
          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
};

export default App;
