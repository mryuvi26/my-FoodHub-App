import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { CategoryProvider } from "./component/Cards/CategoryContext";

import Navbar from "./component/Navbar";
import LoginSignup from "./component/LoginSignup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Snowfall from "react-snowfall";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

import AdminRoutes from "./admin/AdminRoutes";

// ================= Scroll Helper =================
function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const map = {
      "/": "home",
      "/menu": "menu",
      "/mobile-app": "mobile",
      "/contact": "contact",
    };

    const targetId = map[location.pathname];
    if (!targetId) return;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        setTimeout(scrollToTarget, 50);
      }
    };

    scrollToTarget();
  }, [location]);

  return null;
}

// ================= MAIN APP =================
export default function App() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const isAdminRoute = location.pathname.startsWith("/admin");

  // ================= ADMIN PANEL =================
  if (isAdminRoute) {
    return <AdminRoutes />;
  }

  // ================= USER APP =================
  return (
    <CategoryProvider>
      
      {/* ❄️ Snowfall only for USER */}
      <Snowfall
        snowflakeCount={120}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 50,
        }}
      />

      <div className="min-h-screen bg-gray-500 flex justify-center">
        <div className="w-full bg-white/95 overflow-hidden">

          {/* Navbar */}
          <Navbar
            onLogin={() => {
              setMode("login");
              setOpen(true);
            }}
            onSignup={() => {
              setMode("signup");
              setOpen(true);
            }}
          />

          {/* Scroll */}
          <ScrollToSection />

          {/* User Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Home />} />
            <Route path="/mobile-app" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>

          {/* Login / Signup */}
          <LoginSignup
            open={open}
            mode={mode}
            close={() => setOpen(false)}
            setMode={setMode}
          />
        </div>
      </div>
    </CategoryProvider>
  );
}
