import { useBreakpoint } from "@/hooks/Breakpoint";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ReponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  // handleClose?: () => void;
  title?: string;
  footer?: React.ReactNode | null;
  loading?: boolean;
}

function ResponsiveModal({
  children,
  open,
  onOpenChange,
  title,
  footer = null,
  // handleClose,
  loading = false,
}: ReponsiveModalProps) {
  const { isGreaterOrEqualTo } = useBreakpoint();
  const isDesktop = isGreaterOrEqualTo("md");

  const Body = isDesktop ? Dialog : Drawer;
  const Content = isDesktop ? DialogContent : DrawerContent;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;
  const Footer = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <Body
      open={open}
      onOpenChange={(open) => {
        if (onOpenChange) {
          if (loading) {
            toast.warning("Loading, please wait.");
            return;
          } else onOpenChange(open);
        }
      }}
    >
      <Content
        aria-describedby={title || ""}
        className={cn(
          "w-full bg-white p-6 overflow-hidden capitalize",
          isDesktop
            ? "sm:max-w-2xl border-none overflow-y-auto hide-scrollbar max-h-[85vh] !rounded-2xl"
            : "rounded-t-3xl"
        )}
      >
        <div className={cn("relative")}>
          {loading && (
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
              <BeatLoader color="var(--color-primary)" size={32} />
            </div>
          )}
          <div
            className={cn(
              loading
                ? "opacity-25 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            )}
          >
            {title && (
              <Header className="text-left">
                <Description className="hidden"></Description>
                <Title className="font-display">{title}</Title>
              </Header>
            )}
            <div className="max-h-[80vh]">{children}</div>
            {footer && <Footer className="p-0">{footer}</Footer>}
          </div>
        </div>
      </Content>
    </Body>
  );
}

export default memo(ResponsiveModal);
