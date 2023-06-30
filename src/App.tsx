import React, { useState, useMemo } from "react";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Tarinamme from "./pages/Tarinamme";
import Tuotteemme from "./pages/Tuotteemme";
import Myyntiehdot from "./pages/Myyntiehdot";
import Tietosuojaseloste from "./pages/Tietosuojaseloste";
import { Route, Routes } from "react-router-dom";
import Footer from "./pages/Footer";
import "./output.css";
import { LanguageContext } from "./LanguageContext";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [language, setLanguage] = useState("fi");
  const [items, setItems] = useState<CartItem[]>([]);

  const contextValue = useMemo(() => ({ language, setLanguage }), [
    language,
    setLanguage
  ]);

  return (
    <>
      <LanguageContext.Provider value={contextValue}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarinamme" element={<Tarinamme />} />
          <Route
            path="/tuotteemme"
            element={<Tuotteemme setItems={setItems} />}
          />
          <Route
            path="/cart"
            element={
              <ShoppingCartPage
                cartItems={items}
                onQuantityChange={(id: number, quantity: number): void => {
                  // Implement your logic to handle quantity change
                }}
                onRemoveItem={(id: number): void => {
                  // Implement your logic to remove item from the cart
                }}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myyntiehdot" element={<Myyntiehdot />} />
          <Route path="/tietosuojaseloste" element={<Tietosuojaseloste />} />
        </Routes>
        <Footer />
      </LanguageContext.Provider>
    </>
  );
}

export default App;
