// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ICONS */
const IconHamburger = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const IconCart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24 24">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.8 19.2A1 1 0 007 21h10a1 1 0 001-.8L19 13" />
  </svg>
);

const IconHeart = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21s-7.333-4.35-9.333-7.2C-1.333 8.8 5.333 3 12 7.2 18.667 3 25.333 8.8 21.333 13.8 19.333 16.65 12 21 12 21z" />
  </svg>
);

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  /* UPDATE COUNTS */
  function updateCounts() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wish = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const cartTotal = Array.isArray(cart)
        ? cart.reduce((sum, item) => sum + (item.qty || 1), 0)
        : 0;

      const wishTotal = Array.isArray(wish) ? wish.length : 0;

      setCartCount(cartTotal);
      setWishCount(wishTotal);
    } catch {
      setCartCount(0);
      setWishCount(0);
    }
  }

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("focus", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("focus", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  /* SEARCH HANDLING */
  const url = new URLSearchParams(location.search);
  const qInit = url.get("q") || "";
  const exactInit = url.get("exact") === "1";

  const [q, setQ] = useState(qInit);
  const [exact, setExact] = useState(exactInit);

  useEffect(() => {
    const up = new URLSearchParams(window.location.search);
    setQ(up.get("q") || "");
    setExact(up.get("exact") === "1");
  }, [location.search]);

  function updateUrl(params = {}) {
    const up = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([k, v]) => {
      if (!v) up.delete(k);
      else up.set(k, v);
    });
    navigate("/" + (up.toString() ? "?" + up.toString() : ""));
  }

  function onSubmit(e) {
    e.preventDefault();
    updateUrl({ q, exact: exact ? "1" : "" });
  }

  return (
    <header className="bg-white shadow sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">

        {/* MOBILE MENU */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setMobileOpen(v => !v)}
        >
          <IconHamburger />
        </button>

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 
                     bg-clip-text text-transparent drop-shadow-md hover:brightness-125 transition"
        >
          AuraPrime
        </Link>

        {/* SEARCH BAR */}
        <form onSubmit={onSubmit} className="hidden md:flex flex-1 items-center gap-2">

          {/* ⭐ HOME BUTTON ⭐ */}
          <Link
            to="/"
            className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition flex items-center gap-1 text-gray-700"
          >
            <span className="text-lg">🏠</span>
            <span className="text-sm font-medium">Home</span>
          </Link>

          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              updateUrl({ q: e.target.value });
            }}
            placeholder="Search products, brands and more"
            className="flex-1 border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-500"
          />

          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={exact}
              onChange={(e) => {
                setExact(e.target.checked);
                updateUrl({ exact: e.target.checked ? "1" : "" });
              }}
            />
            Exact
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-all"
          >
            Search
          </button>
        </form>

        {/* WISHLIST */}
        <Link to="/wishlist" className="relative flex items-center gap-1 hover:text-amber-600">
          <IconHeart />
          <span className="hidden md:inline">Wishlist</span>
          {wishCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs px-1 rounded">
              {wishCount}
            </span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="relative flex items-center gap-1 hover:text-amber-600">
          <IconCart />
          <span className="hidden md:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-amber-600 text-white text-xs px-1 rounded">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* ⭐⭐ SECOND NAVBAR ⭐⭐ */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white shadow-inner border-t border-amber-500">
        <div className="container mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm font-medium">
          
          {[
            { label: "Deliver to India", icon: "📍" },
            { label: "Prime", icon: "⭐" },
            { label: "Daily Deals", icon: "🔥" },
            { label: "Best Sellers", icon: "🏆" },
            { label: "Mobiles", icon: "📱" },
            { label: "Fashion", icon: "👗" },
            { label: "Electronics", icon: "💻" },
            { label: "Home & Kitchen", icon: "🏠" },
            { label: "Beauty", icon: "💅" },
            { label: "Books", icon: "📚" },
            { label: "Grocery", icon: "🛒" },
            { label: "Toys", icon: "🧸" },
            { label: "Sports", icon: "🏀" },
            { label: "Customer Service", icon: "💬" },
          ].map((item) => (
            <span
              key={item.label}
              className="group flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md
                         hover:bg-white/10 hover:text-yellow-200 transition-all duration-150"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="relative after:absolute after:left-0 after:bottom-0 
                                after:h-0.5 after:w-0 after:bg-white 
                                group-hover:after:w-full after:transition-all after:duration-300">
                {item.label}
              </span>
            </span>
          ))}

        </div>
      </div>

      {/* ⭐ MOBILE SEARCH PANEL ⭐ */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-3 border-t bg-white">
          <form onSubmit={onSubmit} className="space-y-3">

            {/* Mobile Home */}
            <Link
              to="/"
              className="block w-full text-center bg-gray-100 py-2 rounded hover:bg-gray-200"
            >
              🏠 Home
            </Link>

            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                updateUrl({ q: e.target.value });
              }}
              placeholder="Search"
              className="w-full border px-3 py-2 rounded"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={exact}
                onChange={(e) => {
                  setExact(e.target.checked);
                  updateUrl({ exact: e.target.checked ? "1" : "" });
                }}
              />
              Exact
            </label>

            <button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700">
              Search
            </button>
          </form>
        </div>
      )}

    </header>
  );
}
