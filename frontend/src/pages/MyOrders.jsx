import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CategoryContext } from "../component/Cards/CategoryContext";

const MyOrders = () => {
  const { url, token } = useContext(CategoryContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders(res.data.data.reverse()); // latest first
      }
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    fetchOrders();
  }, [token]);

  /* 🔄 LOADER */
  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white dark:bg-[#0E1116]
                border border-gray-200 dark:border-gray-700
                rounded-2xl shadow-sm
                p-6
              "
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order ID{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    #{order._id.slice(-6)}
                  </span>
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-3 text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Total: ₹{order.amount}
                </p>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.payment
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                    }`}
                  >
                    {order.payment ? "Paid" : "Unpaid"}
                  </span>

                  <button
                    onClick={fetchOrders}
                    className="
                      px-4 py-2 text-sm font-semibold rounded-lg
                      bg-orange-500 hover:bg-orange-600
                      text-white transition
                    "
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
