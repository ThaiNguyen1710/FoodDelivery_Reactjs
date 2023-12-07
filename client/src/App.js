import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main, Store } from "./containers";

import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { setUserDetail } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { Alert, CheckOutSuccess, MainLoader, Product, Profile, UserOrder } from "./components";
import { setCartItems } from "./context/actions/cartAction";

const App = () => {
  
  const [isLoading, setIsLoading] = useState(false);

  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
 
  useEffect(() => {
    setIsLoading(true);
    const cred = localStorage.getItem("token")
    console.log(cred)
    if (cred) {
      validateUserJWTToken(cred).then((data) => {
        if (data) {
          getAllCartItems(data.userId).then((items) => {
            dispatch(setCartItems(items));
          });
        }
        console.log(data)
        dispatch(setUserDetail(data));

      });
    }

    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  },[]);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex justify-center items-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UserOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-store/*" element={<Store />} />
        <Route path="/product/:id" element={<Product />} />
        
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
