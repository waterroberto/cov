
import { BiBell } from "react-icons/bi";
import { useMobile } from "@/hooks/Mobile";
import { cn } from "@/lib/utils";
import { IoMenu } from "react-icons/io5";
import { DropdownMenuDemo } from "./DropdownMenu";
import { Settings, User } from "lucide-react";
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
        icon: <Settings size={16} />,
      },
      {
        label: "Change Password",
        url: "/dashboard/profile/change-password",
        icon: <User size={16} />,
      },
    ],
  },
];

export default function Navbar({ className, toggleSidebar }: Props) {
  const handleSidebarToggle = () => toggleSidebar();

  return (
    <nav
      className={cn(
        "dashboard-navbar fixed top-0 right-0 w-screen overflow-hidden z-30 p-4 md:px-8 md:py-4 flex gap-4 md:gap-8 items-center justify-between",
        className
      )}
      style={{
        background: "rgba(9, 13, 31, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.5)",
        color: "#f8fafc",
      }}
    >
      <div className="flex w-full items-center justify-between gap-4">
        {/* Sidebar toggle */}
        <button
          onClick={handleSidebarToggle}
          className="flex items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Toggle sidebar"
        >
          <IoMenu size={20} />
        </button>

        {/* KYC verified badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
        >
          {/* fingerprint icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12" />
            <path d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12" />
            <path d="M12 9a3 3 0 0 0-3 3v5" />
            <path d="M15 12a3 3 0 0 0-3-3" />
            <path d="M18.5 12C18.5 8.41 15.59 5.5 12 5.5" />
            <path d="M22 12C22 6.48 17.52 2 12 2" />
            <path d="M12 12v5" />
          </svg>
          <span className="text-xs font-semibold tracking-wide text-emerald-500">Secure &amp; Verified</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
        </div>

        {/* Right actions */}
        <div className="flex gap-3 items-center">
          <button
            className="relative flex items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            aria-label="Notifications"
          >
            <BiBell size={20} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </button>

          <div className="flex items-center pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <DropdownMenuDemo
              handleLogout={() => signOut(auth)}
              items={DropMenuItems}
              triggerElement={
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors duration-200">
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