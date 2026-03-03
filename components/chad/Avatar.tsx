import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
export function AvatarDemo({fallback, src}: {fallback:string, src?: string}) {
  return (
    <Avatar>
      <AvatarImage src={src ? src : ""} alt="user-avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}