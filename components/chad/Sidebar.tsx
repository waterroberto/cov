"use client";

import Logo from "@/components/Global/Logo";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import Navigation from "./Navigation";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { AvatarDemo } from "./Avatar";
import UserDataContext from "@/context/UserDataContext";

interface Props {
  className?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ className, isOpen, toggleSidebar }: Props) {
  const { userData } = useContext(UserDataContext);

  const handleSidebarToggle = () => toggleSidebar();

  const sidebarClass = cn(
    "sidebar z-50 sidebar-mobile fixed left-0 bottom-0 transition-all ease-in-out duration-300",
    isOpen && "open",
    className
  );

  return (
    <aside
      className={sidebarClass}
      style={{
        background: "#090D1F",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "2px 0 24px 0 rgba(0,0,0,0.5)",
        color: "#f8fafc",
      }}
    >
      <div className="flex flex-col h-full">
        {/* User info header */}
        {isOpen && (
          <div
            className="px-4 py-4"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center gap-3">
              <AvatarDemo fallback="CM" />
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{userData?.fullname}</p>
                <p className="text-xs text-gray-400 truncate">{userData?.email}</p>
              </div>
            </div>
            {/* KYC status pill */}
            <div
              className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full w-fit"
              style={{ background: "rgba(209,250,229,0.7)", border: "1px solid rgba(110,231,183,0.5)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase">KYC Verified</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <Navigation isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
        </div>

        {/* Bottom section */}
        <div
          className="px-3 py-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(0deg,rgba(255,255,255,0.02) 0%,transparent 100%)",
          }}
        >
          {isOpen && (
            <div className="mb-3 flex justify-center">
              <Logo width={100} height={80} />
            </div>
          )}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSidebarToggle();
            }}
            className="flex items-center justify-center w-full p-2.5 rounded-xl font-medium transition-all duration-200 group"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <>
                <span className="text-xs mr-1.5">Collapse</span>
                <IoChevronBack size={16} className="group-hover:scale-110 transition-transform" />
              </>
            ) : (
              <IoChevronForward size={16} className="group-hover:scale-110 transition-transform" />
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
