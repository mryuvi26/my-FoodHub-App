import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const url = "http://localhost:2500";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all orders (ADMIN)
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update status
  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });

      if (res.data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* 🔄 Loader */
  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Admin Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No orders found
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white dark:bg-[#0E1116]
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-md p-6
              "
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order ID:{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    #{order._id.slice(-6)}
                  </span>
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="
                    border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-[#161C24]
                    text-gray-800 dark:text-gray-200
                    rounded-lg px-3 py-1 text-sm font-medium
                    focus:outline-none
                  "
                >
                  <option>Order Processing</option>
                  <option>Out for delivery</option>
                  <option>Delivered</option>
                </select>
              </div>

              {/* USER INFO */}
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                <p className="font-semibold">
                  {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state}, {order.address.country}
                </p>
                <p>📞 {order.address.phone}</p>
              </div>

              {/* ITEMS */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 text-sm
                               text-gray-700 dark:text-gray-300"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  Total: ₹{order.amount}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      order.payment
                        ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                    }`}
                >
                  {order.payment ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
