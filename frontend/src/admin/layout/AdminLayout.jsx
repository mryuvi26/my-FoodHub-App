import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col 
      bg-gray-50 dark:bg-gray-900 
      transition-colors duration-300">

      {/* NAVBAR */}
      <AdminNavbar />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            px-4 sm:px-8 md:px-12
            py-6 sm:py-8
            overflow-y-auto
            bg-white dark:bg-[#0E1116]
            text-gray-900 dark:text-gray-100
            transition-colors duration-300
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}
