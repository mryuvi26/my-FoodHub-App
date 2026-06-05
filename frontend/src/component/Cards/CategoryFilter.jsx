import { menu_list } from "../../assets/frontend_assets/assets";
import { useCategory } from "./CategoryContext";

export default function CategoryFilter() {
  const { active, setActive } = useCategory();

  return (
    <div className="flex gap-8 overflow-x-auto pb-4 px-5">
      {menu_list.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.menu_name)}
          className="flex flex-col items-center gap-3 mt-2"
        >
          <div
            className={`
              w-32 h-32 rounded-full overflow-hidden border-4 shadow-xl
              ${
                active === cat.menu_name
                  ? "border-orange-500 scale-105"
                  : "border-gray-300 dark:border-gray-600"
              }
              transition-all
            `}
          >
            <img
              src={cat.menu_image}
              alt={cat.menu_name}
              className="w-full h-full object-cover"
            />
          </div>

          <span
            className={`
              text-xl font-semibold
              ${
                active === cat.menu_name
                  ? "text-orange-600"
                  : "text-gray-600 dark:text-gray-300"
              }
            `}
          >
            {cat.menu_name}
          </span>
        </button>
      ))}
    </div>
  );
}
