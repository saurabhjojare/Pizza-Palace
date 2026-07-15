import React from "react";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetCustomers from "./components/customer/customer.page";
import GetPizza from "./components/pizza/get-pizza-customer.page";
import OrderPage from "./components/order/orders.page";
import UpdatePizza from "./components/pizza/update-pizza.page";
import AddPizza from "./components/pizza/add-pizza.page";
import SignUpForm from "./components/sign-up/sign-up.page";
import HomePage from "./components/home/home.page";
import FetchPizza from "./components/pizza/get-pizza-admin.page";
import { CartProvider } from "./context/cart.context";
import MyOrders from "./components/order/my-orders.page";
import UserProfile from "./components/profile/user-profile.page";
import GetAdmin from "./components/customer/admin.page";
import UpdateUserProfile from "./components/profile/update-profile.page";
import Header from "./components/header/header.page";
import Navbar from "./components/navbar/navbar.page";
import Login from "./components/login/login.page";
import Footer from "./components/footer/footer.page";

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
