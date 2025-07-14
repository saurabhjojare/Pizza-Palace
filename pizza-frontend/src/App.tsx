import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CustomerPage from "./pages/Customer";
import PizzaPage from "./pages/Pizza";
import OrderPage from "./pages/Order";
import AdminPage from "./pages/Admin";
import UpdatePizza from "./components/pizza/UpdatePizza";
import AddPizza from "./components/pizza/AddPizza";
import Login from "./components/login/Login";
import SignUpPage from "./pages/SignUp";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
            <Route path="/home" element={<PizzaPage />}></Route>

            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/pizza" element={<PizzaPage />}></Route>
            <Route path="/order" element={<OrderPage />} />
            <Route path="/customer" element={<CustomerPage />}></Route>

            <Route path="/update-pizza/:pizzaId" element={<UpdatePizza />} />
            <Route path="/add-pizza" element={<AddPizza />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
