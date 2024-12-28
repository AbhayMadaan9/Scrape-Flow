"use client";

import {
  HomeIcon,
  Layers2Icon,
  ShieldIcon,
  SettingsIcon,
  CoinsIcon,
  MenuIcon,
} from "lucide-react";
import Logo from "./Logo";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet";

const routes = [
  {
    label: "Home",
    href: "",
    icon: HomeIcon,
  },
  {
    label: "Workflows",
    href: "workflows",
    icon: Layers2Icon,
  },
  {
    label: "Credentials",
    href: "credentials",
    icon: ShieldIcon,
  },
  {
    label: "Billing",
    href: "billing",
    icon: CoinsIcon,
  },
];
export function DesktopSidebar() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-background dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-seperate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-seperate p-4">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-1">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={
              buttonVariants({
                variant:
                  activeRoute?.href === route.href
                    ? "sidebarItemActive"
                    : "sidebarItem",
                size: "icon",
              }) + "w-full gap-2 !justify-start hover:cursor-pointer"
            }
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
export function MobileSidebar() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[480px] sm:w-[540px] space-y-4"
            side="left"
          >
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  href={route.href}
                  key={route.href}
                  className={
                    buttonVariants({
                      variant:
                        activeRoute?.href === route.href
                          ? "sidebarItemActive"
                          : "sidebarItem",
                      size: "icon",
                    }) + "w-full gap-2 !justify-start hover:cursor-pointer"
                  }
                  onClick={(prev) => setIsOpen(!prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
