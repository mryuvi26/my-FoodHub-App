import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCategory } from "../component/Cards/CategoryContext";
 
export default function Cart() {
  const { cart, food_list, increaseQty, decreaseQty, toggleCart, url } = useCategory();

  const cartItems = useMemo(() => {
    return food_list.filter((item) => cart[item._id]);
  }, [food_list, cart]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * cart[item._id], 0);
  }, [cartItems, cart]);
 
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
 
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0E1116] transition-colors duration-300">
      {/* Container: Reduced padding on mobile for max screen usage */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 lg:py-12">
       
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <FiShoppingBag className="text-orange-500" />
          My Cart <span className="text-gray-400 text-lg font-normal">({cartItems.length})</span>
        </h1>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
         
          {/* === LEFT SECTION: Cart Items === */}
          <div className="lg:col-span-8">
           
            {/* Desktop Header Row */}
            {cartItems.length > 0 && (
              <div className="hidden md:grid grid-cols-6 gap-4 mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 px-4">
                <p className="col-span-3">Product</p>
                <p className="text-center">Price</p>
                <p className="text-center">Quantity</p>
                <p className="text-right">Total</p>
              </div>
            )}
 
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="
                      group relative bg-white dark:bg-[#161B22]
                      rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800
                      /* Mobile: Flex Row | Desktop: Grid */
                      flex flex-row md:grid md:grid-cols-6 md:items-center gap-4
                    "
                  >
                    {/* 1. IMAGE & TITLE WRAPPER  */}
                    <div className="flex flex-1 gap-4 md:col-span-3 items-center">
                      {/* Image */}
                      <div className="shrink-0">
                        <img
                          src={`${url}/images/${item.image}`}
                          alt={item.name}
                          className="w-20 h-20 md:w-16 md:h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
                        />
                      </div>
 
                      {/* Title & Mobile Attributes */}
                      <div className="flex flex-col justify-between h-full md:h-auto w-full">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm md:text-base pr-6 md:pr-0">
                            {item.name}
                          </p>
                         
                          {/* Mobile Remove Button (Absolute top-right relative to flex container) */}
                          <button
                            onClick={() => toggleCart(item._id)}
                            className="md:hidden text-gray-400 hover:text-red-500 -mt-1 -mr-2 p-2"
                            aria-label="Remove item"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                       
                        {/* Mobile: Unit Price */}
                        <p className="md:hidden text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatPrice(item.price)}
                        </p>
 
                        {/* Mobile: Quantity Control moved here for better thumb reach */}
                        <div className="md:hidden mt-3 flex items-center justify-between">
                             <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => decreaseQty(item._id)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                {cart[item._id]}
                              </span>
                              <button
                                onClick={() => increaseQty(item._id)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                            {/* Mobile: Row Total */}
                            <p className="font-bold text-gray-900 dark:text-white">
                              {formatPrice(item.price * cart[item._id])}
                            </p>
                        </div>
                      </div>
                    </div>
 
                    {/* 2. DESKTOP COLUMNS (Hidden on Mobile) */}
                   
                    {/* Desktop: Price */}
                    <div className="hidden md:block text-center font-medium text-gray-700 dark:text-gray-300">
                      {formatPrice(item.price)}
                    </div>
 
                    {/* Desktop: Quantity */}
                    <div className="hidden md:flex justify-center">
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm transition text-gray-600 dark:text-gray-300"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold dark:text-white">
                          {cart[item._id]}
                        </span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm transition text-gray-600 dark:text-gray-300"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>
 
                    {/* Desktop: Total & Remove */}
                    <div className="hidden md:flex items-center justify-end gap-4">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.price * cart[item._id])}
                      </p>
                      <button
                        onClick={() => toggleCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
 
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#161B22] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
                    <FiShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <NavLink
                    to="/"
                    className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                  >
                    Start Shopping
                  </NavLink>
                </div>
              )}
            </div>
          </div>
 
          {/* === RIGHT SECTION: Summary === */}
          <div className="lg:col-span-4 mt-4 lg:mt-0">
            <div className="space-y-6 sticky top-4">
             
              {/* Promo Code */}
               <div className="bg-white dark:bg-[#161B22] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Have a promo code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="
                      flex-1 bg-gray-50 dark:bg-gray-900
                      border border-gray-200 dark:border-gray-700
                      text-gray-900 dark:text-white
                      rounded-lg px-4 py-2.5
                      text-base /* Prevents iOS Zoom */
                      focus:outline-none focus:ring-2 focus:ring-orange-500
                      placeholder:text-gray-400
                    "
                  />
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition whitespace-nowrap">
                    Submit
                  </button>
                </div>
              </div>
 
              {/* Order Totals */}
              <div className="bg-white dark:bg-[#161B22] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white">Order Summary</h3>
 
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-green-500 font-medium">
                      {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                 
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-base text-gray-900 dark:text-white">Total</span>
                      <div className="text-right">
                        <span className="block font-bold text-2xl text-orange-600 dark:text-orange-500">
                          {formatPrice(total)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Including VAT</span>
                      </div>
                    </div>
                  </div>
                </div>
 
                <NavLink to="/checkout">
                  <button
                    disabled={cartItems.length === 0}
                    className="
                      w-full mt-6 py-4 rounded-xl
                      bg-orange-500 text-white font-bold text-lg
                      hover:bg-orange-600 active:scale-[0.98]
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                      transition-all shadow-lg shadow-orange-500/20
                      touch-manipulation
                    "
                  >
                    Proceed to Checkout
                  </button>
                </NavLink>
               
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}