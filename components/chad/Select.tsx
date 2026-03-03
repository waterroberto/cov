import * as React from "react"
import crypto from 'crypto'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props<T> {
  placeholder: string
  items: T[]
  label: keyof T
  handleSelectItem: (data : T) => void
}

export function SelectScrollable<T>({placeholder, items, handleSelectItem, label}: Props<T>) {
  return (
    <Select  onValueChange={(value) => handleSelectItem(value as T)}>
      <SelectTrigger className="w-full">
        <SelectValue className=" uppercase" placeholder={`${placeholder}`} />
      </SelectTrigger>
      <SelectContent  className="">
        {items.map((item) => (
             <SelectItem className=" uppercase"  key={String(item[label])}  value={String(item[label])}>
              {String(item[label])}
             </SelectItem>
          ))}
          </SelectContent>
          {/* <SelectLabel>North America</SelectLabel> */}
    </Select>
  )
}
