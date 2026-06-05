import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // TOKEN STATE (CORRECT PLACE)
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // CART STATE (WITH PERSISTENCE)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const url = "http://localhost:2500";

  // FETCH FOOD
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list-food`);
        if (res.data.success) {
          setFoodList(res.data.data);
        }
      } catch (err) {
        console.error("Food fetch error:", err);
      }
    };
    fetchFood();
  }, []);

  // 🔹 RESTORE TOKEN ON REFRESH
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 🔹 SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 CART LOGIC
  const toggleCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] ? undefined : 1 }));
  };

  const increaseQty = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      if (prev[id] <= 1) return { ...prev, [id]: undefined };
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  // 🔹 FILTER LOGIC
  const filtered = useMemo(() => {
    return food_list.filter((item) => {
      const searchLower = searchQuery.toLowerCase().trim();

      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower);

      const matchesCategory =
        active === "All" ||
        item.category?.toLowerCase() === active.toLowerCase();

      if (searchQuery !== "") {
        return matchesSearch;
      }

      return matchesCategory;
    });
  }, [active, searchQuery, food_list]);

  return (
    <CategoryContext.Provider
      value={{
        active,
        setActive,
        searchQuery,
        setSearchQuery,
        filtered,
        food_list,
        cart,
        toggleCart,
        increaseQty,
        decreaseQty,
        url,
        token,
        setToken,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);