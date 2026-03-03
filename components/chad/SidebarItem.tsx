import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn, normalizeUrl } from "@/lib/utils";
import { SidebarItemType } from "@/interface";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
  item: SidebarItemType;
  onClick?: () => void;
  isOpen: boolean;
}

export default function SidebarItem({ item, isOpen, onClick }: Props) {
  const {
    icon,
    name,
    slug,
    url,
    child = false,
    children,
    type = "link",
  } = item;

  const pathname = usePathname();

  const isActive =
    normalizeUrl(pathname) === normalizeUrl(url) ||
    (children?.length && normalizeUrl(pathname).startsWith(normalizeUrl(url)));

  const Component = type === "link" ? Link : "div";

  return (
    <div
      className={cn(
        "rounded-lg duration-200 cursor-pointer transition-all",
        isActive
          ? "bg-gradient-to-r from-blue-50 to-blue-50/50 border-l-4 border-blue-600 shadow-sm"
          : "hover:bg-gray-100/50",
        !children?.length && child && "hover:opacity-90",
        type === "link" ? "py-2" : "py-0"
      )}
    >
      <Component
        onClick={isOpen ? onClick : undefined}
        href={url}
        className={cn(
          "flex items-center transition-all",
          isOpen
            ? children?.length
              ? "px-4 gap-0"
              : "px-4 gap-3"
            : cn("gap-0", isOpen ? "px-2" : "px-0")
        )}
      >
        <>
          <div
            className={`flex items-center duration-200 ${
              isOpen ? "mx-0" : `mx-auto ${slug}-tooltip`
            }`}
          >
            <Tooltip>
              <TooltipTrigger className="items-center cursor-pointer flex">
                {icon(isActive ? "text-blue-600" : "text-gray-400")}
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right" className="capitalize bg-gray-900 text-white border-gray-800">
                  {name}
                </TooltipContent>
              )}
            </Tooltip>
          </div>
          {isOpen && (
            <span
              className={cn(
                "capitalize whitespace-nowrap flex-1 flex items-center gap-3 font-medium text-sm transition-colors",
                isActive ? "font-semibold text-blue-700" : "text-gray-700 hover:text-gray-900",
                children?.length ? "text-gray-600" : ""
              )}
            >
              {name}
            </span>
          )}
        </>
      </Component>
    </div>
  );
}
