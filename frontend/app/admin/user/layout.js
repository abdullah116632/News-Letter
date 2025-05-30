"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserList = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div>
      {/* Tabs */}
      <div className="w-full flex items-center bg-amber-100 rounded-t-xl overflow-hidden lg:text-2xl">
        <Link
          href="/admin/user/all"
          className={`px-6 py-3 font-medium transition w-1/2 ${
            isActive("/admin/user/all")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          All Users
        </Link>

        <Link
          href="/admin/user/subscriber"
          className={`px-6 py-3 font-medium transition w-1/2 ${
            isActive("/admin/user/subscriber")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          Subscriber
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserList;
