import CategoryFilter from "./CategoryFilter";
import FoodList from "./FoodList";

export default function Categories() {
  return (
    <div className="
      p-4 md:px-24 pb-12 py-4 space-y-14
      bg-white dark:bg-[#0E1116]
      transition-colors
    ">
      <section>
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Explore our menu
        </h2>

        <p className="max-w-2xl mb-4 text-gray-600 dark:text-gray-300">
          Discover a variety of delicious dishes crafted with fresh ingredients.
        </p>

        <CategoryFilter />
      </section>

      <section className="mt-10" id="food-display">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Top dishes near you
        </h2>

        <FoodList />
      </section>
    </div>
  );
}