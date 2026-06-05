import { useState } from "react";
import { useCategory } from "../component/Cards/CategoryContext";

export default function Checkout() {
  const { cart, food_list, token, url } = useCategory();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const cartItems = food_list.filter((item) => cart[item._id]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item._id],
    0
  );

  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ PLACE ORDER (FETCH)
  const placeOrder = async () => {
  try {
    const items = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: cart[item._id],
    }));

    const orderData = {
      address: data,
      items,
      amount: total,
      payment: false,
    };

    const res = await fetch(`${url}/api/order/placeorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 capital A
      },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    console.log("ORDER RESPONSE:", result);

    if (result.success) {
      window.location.replace(result.url);
    } else {
      alert(result.message || "Error placing order");
    }
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    alert("Something went wrong");
  }
};

  return (
    <div
      className="p-4 md:px-24 py-14
                 bg-white dark:bg-[#0E1116]
                 text-gray-900 dark:text-gray-100 h-full
                 transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT — DELIVERY FORM */}
        <div>
          <h2 className="text-4xl font-bold mb-10">
            Delivery Information
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="firstName" onChange={onChangeHandler} placeholder="First name" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
              <input name="lastName" onChange={onChangeHandler} placeholder="Last name" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
            </div>

            <input name="email" onChange={onChangeHandler} placeholder="Email address" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
            <input name="street" onChange={onChangeHandler} placeholder="Street" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="city" onChange={onChangeHandler} placeholder="City" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
              <input name="state" onChange={onChangeHandler} placeholder="State" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="zipCode" onChange={onChangeHandler} placeholder="Zip code" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
              <input name="country" onChange={onChangeHandler} placeholder="Country" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
            </div>

            <input name="phone" onChange={onChangeHandler} placeholder="Phone" className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-[#161C24] border-gray-300 dark:border-gray-600" />
          </form>
        </div>

        {/* RIGHT — CART TOTAL */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Cart Total</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* 🔥 SAME BUTTON – ONLY onClick ADDED */}
            <button
  type="button"
  onClick={placeOrder}
  className="mt-6 w-full py-3 rounded-lg font-semibold
             bg-orange-500 hover:bg-orange-600
             dark:bg-orange-600 dark:hover:bg-orange-500
             text-white transition"
>
  PROCEED TO PAYMENT
</button>

          </div>
        </div>

      </div>
    </div>
  );
}