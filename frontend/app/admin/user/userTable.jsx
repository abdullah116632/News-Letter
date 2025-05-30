"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaCopy } from "react-icons/fa";
import { getAllUsers, getSubscribedUsers } from "@/redux/slices/usersSlice";

const UserTable = () => {
  const pathname = usePathname();
  console.log(pathname)
  const dispatch = useDispatch();
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [page, setPage] = useState(1);

  // Redux state
  const { users, loading, error } = useSelector((state) => state.usersData);

  // Fetch users based on route and page
  useEffect(() => {
    if (pathname === "/admin/user/subscriber") {
      dispatch(getSubscribedUsers(page));
    } else {
      dispatch(getAllUsers(page));
    }
  }, [dispatch, pathname, page]);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyAll = () => {
    const allEmails = users.map((user) => user.email).join(", ");
    navigator.clipboard.writeText(allEmails);
    setCopiedEmail("all");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const heading =
    pathname === "/admin/user/subscriber" ? "Subscribers" : "All Users";

  if (loading) {
    return (
      <p className="text-center text-white bg-gray-950 p-6 rounded-xl">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 bg-gray-950 p-6 rounded-xl">
        Error: {error}
      </p>
    );
  }

  if (!users || users.length === 0) {
    return (
      <p className="text-center text-gray-400 bg-gray-950 p-6 rounded-xl">
        No users found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-950 rounded-b-2xl text-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-400">{heading}</h2>
        <button
          onClick={handleCopyAll}
          className="text-sm bg-emerald-400 hover:bg-gray-700 px-4 py-2 rounded-lg border border-white/10 cursor-pointer"
        >
          Copy All Emails
        </button>
      </div>

      <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
        <thead className="bg-gray-900 text-left text-white">
          <tr>
            <th className="p-4 border-b border-white/10">#</th>
            <th className="p-4 border-b border-white/10">Image</th>
            <th className="p-4 border-b border-white/10">Full Name</th>
            <th className="p-4 border-b border-white/10 relative">
              Email
              {copiedEmail === "all" && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400 text-sm">
                  All Copied!
                </span>
              )}
            </th>
            <th className="p-4 border-b border-white/10">Is Admin</th>
            <th className="p-4 border-b border-white/10">Is Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-800 transition-all">
              <td className="p-4 border-b border-white/10">{index + 1}</td>
              <td className="p-4 border-b border-white/10">
                <img
                  src={user.img}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
              </td>
              <td className="p-4 border-b border-white/10">{user.fullName}</td>
              <td className="relative p-4 border-b border-white/10 flex items-center justify-between gap-2">
                <span className="truncate max-w-[160px]">{user.email}</span>
                <button
                  onClick={() => handleCopy(user.email)}
                  title="Copy Email"
                  className="text-gray-400 hover:text-white cursor-pointer pr-8 lg:pr-12"
                >
                  <FaCopy />
                </button>
                {copiedEmail === user.email && (
                  <span className="absolute right-0 text-green-400 text-sm ml-1">
                    Copied!
                  </span>
                )}
              </td>
              <td className="p-4 border-b border-white/10">
                {user.isAdmin ? (
                  <FaCheckCircle className="text-green-400 text-lg" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-lg" />
                )}
              </td>
              <td className="p-4 border-b border-white/10">
                {user.isSubscribed ? (
                  <FaCheckCircle className="text-green-400 text-lg" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-lg" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm text-gray-400 lg:text-xl font-bold">
          Page {page}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
