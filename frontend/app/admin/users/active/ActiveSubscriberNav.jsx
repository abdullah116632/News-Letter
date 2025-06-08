"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveSubscriberNav = () => {
    const pathname = usePathname();

  const isActive = (path) => pathname === path;
  return (
    <div className="flex flex-wrap items-center overflow-hidden text-base lg:text-lg bg-emerald-500 rounded-xl shadow-md">
  {[
    { href: "/admin/users/active", label: "All" },
    { href: "/admin/users/active/scholar-track", label: "ScholarTrack." },
    { href: "/admin/users/active/career-catch", label: "CareerCatch." },
    { href: "/admin/users/active/all-access", label: "OpT. All-Access" },
  ].map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={` px-4 font-semibold text-center transition-colors ${
        isActive(link.href)
          ? "bg-fuchsia-600 text-black"
          : "text-cyan-50 hover:bg-amber-500"
      }`}
    >
      {link.label}
    </Link>
  ))}
</div>

  );
};

export default ActiveSubscriberNav;
