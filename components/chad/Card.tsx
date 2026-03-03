import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export enum GlownCardSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  size?: GlownCardSize;
  color?: "default" | "success" | "danger" | "secondary" | "dark";
  children?: React.ReactNode;
  maxWidth?: string;
  className?: string;
  headerTemplate?: React.ReactNode;
  noBorder?: boolean;
};

export default function GlownCard({
  title,
  description,
  footer,
  children,
  maxWidth = "1024",
  className,
  headerTemplate,
  noBorder = false,
  color = "default",
}: CardProps) {
  const showHeader = Boolean(headerTemplate || title || description);

  return (
    <Card
      className={cn(`w-full overflow-y-auto  ${`max-w-${[maxWidth]}px`}`, noBorder && "border-none")}
    >
      {showHeader && (
        <CardHeader
          className={cn(!headerTemplate && !title && !description && "p-4")}
        >
          {headerTemplate && headerTemplate}
          {title && (
            <CardTitle
              className={cn("text-xl font-bold font-display text-gray-1")}
            >
              {title}
            </CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      <CardContent
        className={cn(
          "rounded-xl",
          color === "default" && "bg-white",
          color === "success" && "bg-success-muted",
          color === "danger" && "bg-danger-muted",
          color === "secondary" && "bg-secondary-muted",
          color === "dark" && "bg-gray-1 text-gray-5",
          className
        )}
        // showHeader={showHeader}
      >
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-between">{footer}</CardFooter>
      )}
    </Card>
  );
}
