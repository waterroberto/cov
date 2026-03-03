import * as React from "react"

import { cn } from "@/lib/utils"
import { useBreakpoint } from "@/hooks/Breakpoint"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import TextInput from "../Global/TextInput"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

interface Props {
  title: string
  isOpen: boolean,
  handleOpenDrawerDialog: React.Dispatch<React.SetStateAction<boolean>>
  Component?: React.ReactNode
  height?: string
  theme?: "dark" | "light"
  subTitle?: string
}

export function DrawerDialogDemo({title, subTitle, Component, handleOpenDrawerDialog, isOpen, theme}: Props) {

  const {isGreaterOrEqualTo} = useBreakpoint()
  let themeStyle: string
  let headerStyle: string
  let titleStyle: string
  
  if(theme === "dark") {
    themeStyle = "bg-primary text-gray-50"
    headerStyle = "text-gray-50"
    titleStyle = "text-gray-50"
  } else {
    themeStyle = "bg-white border-t-4 border-blue-600"
    headerStyle = "text-gray-900"
    titleStyle = "text-gray-900"
  }

  if (isGreaterOrEqualTo("sm")) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenDrawerDialog}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger> */}
        <DialogContent className={`sm:min-w-[600px] rounded-3xl shadow-2xl ${themeStyle}`}>
          <DialogHeader>
            <DialogTitle className={titleStyle}>{title}</DialogTitle>
            <DialogDescription className={theme === "dark" ? "text-gray-50" : "text-gray-600"}>
             {subTitle}
            </DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
          {Component}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenDrawerDialog}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger> */}
      <DrawerContent className={`rounded-t-3xl shadow-2xl ${themeStyle}`}>
        <div className='max-h-[calc(100vh-120px)] overflow-y-auto px-4 sm:px-6'>
          <DrawerHeader className={`text-left -mx-4 sm:-mx-6 px-4 sm:px-6 mb-4 ${headerStyle}`}>
            <DrawerTitle className={titleStyle}>{title}</DrawerTitle>
            <DrawerDescription className={theme === "dark" ? "text-gray-50" : "text-gray-600"}>
             {subTitle}
            </DrawerDescription>
          </DrawerHeader>

          {/* <ProfileForm className="px-4" /> */}
          {Component}

          {/* <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <TextInput type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="username">Username</label>
        <TextInput id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
