import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import * as authService from "../../services/authService.js";
import AuthContext from "../../contexts/authContext.js";

import Logout from "../Logout/Logout.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Home from "../Home/Home.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import ProductList from "../ProductList/ProductList.jsx";
import About from "../About/About.jsx";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import Details from "../Details/Details.jsx";
import AddReviewPage from "../AddReview/AddReviewPage.jsx";
import Profile from "../Profile/Profile.jsx";
import EditReviewPage from "../EditReview/EditReviewPage.jsx";
import Path from "../../path.js";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem("accessToken");
    return {};
  });
  useEffect(() => {
    navigate(Path.Home);
  }, [auth]);

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);
    console.log(result);
    localStorage.setItem("accessToken", result.accessToken);
    setAuth(result);
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(
      values.username,
      values.email,
      values.password
    );
    console.log(result);
    localStorage.setItem("accessToken", result.accessToken);
    setAuth(result);
  };
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setAuth({});
  };
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    _userId: auth._id,
    username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.email,
  };

  return (
    <AuthContext.Provider value={values}>
      <div className="container">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductList category="" />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/products/kitchen"
            element={<ProductList category="kitchen" />}
          />
          <Route
            path="/products/bedroom"
            element={<ProductList category="bedroom" />}
          />
          <Route
            path="/products/living-room"
            element={<ProductList category="living-room" />}
          />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/products/:id/add-review" element={<AddReviewPage />} />
          <Route
            path="/products/:id/edit-review/:reviewId"
            element={<EditReviewPage />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;