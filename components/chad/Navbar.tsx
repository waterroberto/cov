


import { BiBell } from "react-icons/bi";

import { useMobile } from "@/hooks/Mobile";
import { cn } from "@/lib/utils";
import { IoMenu } from "react-icons/io5";
import { DropdownMenuDemo } from "./DropdownMenu";
import { Settings, User, LogOut } from "lucide-react";
import { AvatarDemo } from "./Avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";


interface Props {
  className?: string;
  isOpen?: boolean;
  toggleSidebar: () => void;
}

const DropMenuItems = [
  {
    title: "My Account",
    children: [
      {
        label: "Profile Setting",
        url: "/dashboard/profile/profile-settings",
        icon: <Settings size={16} />
      },
      {
        label: "Change Password",
        url: "/dashboard/profile/change-password",
        icon: <User size={16} />
      },
    ]
  },
]

export default function Navbar({ className, isOpen, toggleSidebar }: Props) {
  const isMobile = useMobile();

  const handleSidebarToggle = () => toggleSidebar();

  const navbarClass = cn(
    "dashboard-navbar fixed top-0 right-0 w-screen overflow-hidden z-30 bg-gradient-to-r from-gray-50 to-blue-50 backdrop-blur-md border-b border-white/20 shadow-sm p-4 md:px-8 md:py-4 flex gap-4 md:gap-8 items-center justify-between text-gray-900",
    className
  );

  return (
    <nav className={navbarClass}>
      <div className="flex w-full items-center justify-between gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={handleSidebarToggle}
          className="flex items-center justify-center p-2.5 rounded-lg bg-white/70 hover:bg-white shadow-sm border border-white/30 text-gray-700 hover:text-gray-900 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <IoMenu size={20} />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side - Notifications & User Menu */}
        <div className="flex gap-3 md:gap-4 items-center justify-center">
          {/* Notification Bell */}
          <button className="flex items-center justify-center p-2.5 rounded-lg bg-white/70 hover:bg-white shadow-sm border border-white/30 text-gray-700 hover:text-gray-900 transition-all duration-200 relative" aria-label="Notifications">
            <BiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Dropdown */}
          <div className="flex items-center pl-3 border-l border-white/20">
            <DropdownMenuDemo
              handleLogout={() => signOut(auth)}
              items={DropMenuItems}
              triggerElement={
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/50 transition-colors duration-200">
                  <AvatarDemo fallback="CN" />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}