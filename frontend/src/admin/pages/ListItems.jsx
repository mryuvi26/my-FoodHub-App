  import { useEffect, useState } from "react";
  import { Trash2, ImageOff } from "lucide-react";
  import api from "../../api";

  export default function ListItems() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = async () => {
      try {
        const res = await api.get("/api/food/list-food");
        if (res.data.success) {
          setFoods(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const deleteFood = async (id) => {
      if (!window.confirm("Delete this item?")) return;

      try {
        const res = await api.delete("/api/food/remove-food", {
          data: { id },
        });

        if (res.data.success) {
          fetchFoods();
        }
      } catch (err) {
        console.error(err);
      }
    };


    useEffect(() => {
      fetchFoods();
    }, []);

    return (
      <div className="w-full">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            All Food Items
          </h2>
          <p className="text-sm text-gray-500">
            Manage your menu items
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border dark:border-gray-700 bg-white dark:bg-[#0E1116]">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="border dark:border-gray-700">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center">
                    Loading...
                  </td>
                </tr>
              ) : foods.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-14 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <ImageOff />
                      <p>No items found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food._id} className="border-t dark:border-gray-700">
                    <td className="p-3">
                      <img
                        src={`http://localhost:2500/images/${food.image}`}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3">{food.name}</td>
                    <td className="p-3">{food.category}</td>
                    <td className="p-3">${food.price}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteFood(food._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    );
  }