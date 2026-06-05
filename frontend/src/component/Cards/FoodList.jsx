import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { useCategory } from "./CategoryContext";

export default function FoodList() {
  const { filtered, cart, toggleCart, url, increaseQty, decreaseQty } = useCategory();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Agar search result khali hai */}
      {filtered.length === 0 ? (
        <div className="col-span-full text-center py-20 text-gray-500 text-xl">
          No food items found matching your search.
        </div>
      ) : (
        filtered.map((item) => (
          <div
            key={item._id}
            className="
              bg-white dark:bg-[#0E1116]
              rounded-3xl overflow-hidden shadow-lg
              border border-gray-200 dark:border-gray-700
              hover:border-orange-500 hover:shadow-2xl
              duration-300 group
            "
          >
            <div className="overflow-hidden">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="
                  h-90 md:h-60 sm:h-50 w-full object-cover
                  group-hover:scale-110 duration-300
                  rounded-tl-2xl rounded-tr-2xl
                "
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>
                <FiHeart className="text-2xl text-gray-500 dark:text-gray-400 hover:text-orange-600 cursor-pointer" />
              </div>
               
              <div className="mt-1 flex items-center gap-1 text-orange-500">
                ⭐ <span className="text-gray-700 dark:text-gray-300 text-sm">4.5</span>
              </div>
                 <span>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm h-12 overflow-hidden">
                  {item.description}
                </p>
                 </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2 block">
                ${item.price}
              </span>

              {cart[item._id] ? (
                <>
                  <div className="flex items-center justify-end gap-4 mt-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <FiMinus className="dark:text-white" />
                    </button>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {cart[item._id]}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <FiPlus className="dark:text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleCart(item._id)}
                    className="w-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold py-3 rounded-xl mt-4"
                  >
                    Remove from Cart
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggleCart(item._id)}
                  className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl mt-4 hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}