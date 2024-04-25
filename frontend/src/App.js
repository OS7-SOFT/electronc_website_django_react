import React, { createContext, useState } from "react";
import { Footer, Header } from "./components/sections";
import { Route, Routes } from "react-router-dom";
import {
  CheckoutScreen,
  HomeScreen,
  ProfileScreen,
  ProductScreen,
  StoreScreen,
  PaidScreen,
  LoginScreen,
  RegisterScreen,
  AdminScreen,
  UpdateProfileScreen,
} from "./screens/index";

export const AdminContent = createContext(null);

const App = () => {
  const [currentContent, setCurrentContent] = useState("Dashboard");

  const adminContentValue = { currentContent, setCurrentContent };

  return (
    <>
      <Routes>
        <Route
          path={"/login/"}
          element={
            <>
              <Header />
              <LoginScreen />
              <Footer />
            </>
          }
          exact
        />
        <Route
          path={"/register/"}
          element={
            <>
              <Header />
              <RegisterScreen />
              <Footer />
            </>
          }
          exact
        />
        <Route
          path={"/update-profile/"}
          element={
            <>
              <Header />
              <UpdateProfileScreen />
              <Footer />
            </>
          }
          exact
        />
        <Route
          path={"/"}
          element={
            <>
              <Header />
              <HomeScreen />
              <Footer />
            </>
          }
          exact
        />
        <Route
          path={"/store/:category"}
          element={
            <>
              <Header />
              <StoreScreen />
              <Footer />
            </>
          }
        />
        <Route
          path={"/store/"}
          element={
            <>
              <Header />
              <StoreScreen />
              <Footer />
            </>
          }
        />
        <Route
          path={"/paid/:orderId"}
          element={
            <>
              <Header />
              <PaidScreen />
              <Footer />
            </>
          }
        />
        <Route
          path={"/product-details/:productId"}
          element={
            <>
              <Header />
              <ProductScreen />
              <Footer />
            </>
          }
        />
        <Route
          path={"/checkout/"}
          element={
            <>
              <Header />
              <CheckoutScreen />
              <Footer />
            </>
          }
        />
        <Route
          path={"/profile/:id"}
          element={
            <>
              <Header />
              <ProfileScreen />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin/:id"
          element={
            <AdminContent.Provider value={adminContentValue}>
              <AdminScreen />
            </AdminContent.Provider>
          }
        />
      </Routes>
    </>
  );
};

export default App;
