import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import Link from "next/link"
import React from "react"

interface Item {
  label: string
  url?: string | undefined
  onClick?: () => void | undefined
  icon: string | React.ReactNode
}
interface Items {
  title?: string | undefined
  children: Item[]
}

interface Props {
  triggerElement: React.ReactNode
  items: Items[]
  handleLogout?: () => void
}

export function DropdownMenuDemo({ triggerElement, items, handleLogout }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerElement}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border border-white/30 shadow-lg rounded-xl">
        {items.map((d, index) => (
          <div key={index}>
            {d.title && (
              <>
                <DropdownMenuLabel className="text-gray-900 font-semibold px-4 py-2 text-sm">
                  {d.title}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200/50" />
              </>
            )}
            {d.children.length &&
              <>
                <DropdownMenuGroup>
                  {d.children.map((c, index) => (
                    <Link href={`${c.url}`} key={`${c.label}-${index}`}>
                      <DropdownMenuItem
                        onClick={() => {
                          return c.onClick ? c.onClick() : null
                        }}
                        className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer rounded-md mx-1 px-3 transition-colors duration-200"
                      >
                        <span className="flex items-center gap-2 text-gray-600 mr-2">
                          {c.icon}
                        </span>
                        <span>{c.label}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-200/50" />
              </>
            }

            {handleLogout && (
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer rounded-md mx-1 px-3 transition-colors duration-200"
              >
                <span className="flex items-center gap-2 mr-2">
                  <LogOut size={16} />
                </span>
                <span>Log out</span>
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
