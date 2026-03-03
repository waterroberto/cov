import { links } from "@/utils/index";
import { cn } from "@/lib/utils";
import React from "react";
import SidebarItem from "@/components/chad/SidebarItem";

export default function Navigation({ isOpen, handleSidebarToggle }: Readonly<{ isOpen: boolean, handleSidebarToggle:() => void }>) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-2 list-none"
      )}
    >
      {links.map((item, index) => (
        <SidebarItem item={item} key={index} isOpen={isOpen} onClick={handleSidebarToggle} />
      ))}
    </ul>
  );
}
