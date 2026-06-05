import { NavLink } from "react-router-dom";
import { PlusCircle, List, ClipboardList } from "lucide-react";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium
    transition-all duration-300
    ${
      isActive
        ? "bg-red-500 text-white shadow-md"
        : "text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800"
    }
    justify-center sm:justify-start
    `;

  return (
    <aside
      className="
        w-16 sm:w-64 min-h-screen
        border-r dark:border-gray-700
        bg-white dark:bg-[#0E1116]
        px-2 sm:px-5 py-8
        transition-all duration-300
      "
    >
      <div className="flex flex-col gap-3">

        <NavLink to="add" className={linkClass}>
          <PlusCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Add Items</span>
        </NavLink>

        <NavLink to="list" className={linkClass}>
          <List className="w-5 h-5" />
          <span className="hidden sm:inline">List Items</span>
        </NavLink>

        <NavLink to="orders" className={linkClass}>
          <ClipboardList className="w-5 h-5" />
          <span className="hidden sm:inline">Orders</span>
        </NavLink>

      </div>
    </aside>
  );
}
