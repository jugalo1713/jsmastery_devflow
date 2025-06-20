"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId: string | undefined;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        const linkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light-900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              className={cn({ "invert-colors": !isActive })}
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {linkComponent}
          </SheetClose>
        ) : (
          <div key={item.route}>{linkComponent}</div>
        );
      })}
    </>
  );
};
export default NavLinks;
