"use client";

import Logo from "@/components/Global/Logo";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import Navigation from "./Navigation";

import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { AvatarDemo } from "./Avatar";
import UserDataContext from '@/context/UserDataContext';

interface Props {
  className?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ className, isOpen, toggleSidebar, }: Props) {
  const { userData } = useContext(UserDataContext)

  const handleSidebarToggle = () => toggleSidebar();

  const sidebarClass = cn(
    "sidebar z-50 sidebar-mobile fixed left-0 bottom-0 bg-white transition-all ease-in-out duration-300 text-gray-900 border-r border-gray-200/40 shadow-xl",
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-50/40 before:to-transparent before:-z-10",
    isOpen && "open",
    className
  );

  return (
    <>
      <aside className={sidebarClass}>
        <div className="flex flex-col h-full">
          {/* Header with User Info */}
          {isOpen && (
            <div className="px-4 py-4 border-b border-gray-200/60 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
              <div className="flex items-center gap-3">
                <AvatarDemo fallback="CM" />
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900 truncate">{userData?.fullname}</p>
                  <p className="text-xs text-gray-600 truncate">{userData?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Main content area */}
          <div className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar">
            <Navigation isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
          </div>

          {/* Bottom section with Logo and Collapse Button */}
          <div className="border-t border-gray-200/60 px-3 py-3 bg-gradient-to-t from-blue-50/30 to-transparent">
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
              className="flex items-center justify-center w-full p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 font-medium transition-all duration-200 border border-blue-200/50 hover:border-blue-300/70 group"
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
    </>
  );
}
