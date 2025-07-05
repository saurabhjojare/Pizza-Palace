import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CustomerPage from "./Pages/Customer";
import PizzaPage from "./Pages/Pizza";
import OrderPage from "./Pages/Order";
import AdminPage from "./Pages/Admin";
import UpdatePizza from "./components/Pizza/UpdatePizza";
import AddPizza from "./components/Pizza/AddPizza";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<PizzaPage />}></Route>

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
