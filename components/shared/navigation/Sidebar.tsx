"use client";
import { memo } from "react";
import { home, search, heart, user, create } from "@shared_ui/Images";
import Image from "next/image";
import sidebarLink from "@jsons/sidebar-links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProtectRoutes } from "@hooks/useProtectRoutes";
import { useAuth } from "@clerk/nextjs";
import { SignOut } from "@ui/SignOutButton";
function SidebarNavigation() {
  const images = [home, search, heart, create, user];
  const pathname = usePathname();
  const protectRoutes = useProtectRoutes();
  const { userId } = useAuth();
  return (
    <>
      {!protectRoutes.includes(pathname) && userId && (
        <section className="fixed left-0 bottom-0 right-0 flex-row-even h-20 md:sticky md:left-0 md:top-0 z-20 md:flex-col-between md:h-screen md:w-fit  md:overflow-auto md:border-r md:pb-5 md:pt-28 bg-secondary-300 text-white">
          <aside className="flex w-full flex-1 flex-row md:flex-col justify-evenly items-center md:justify-center md:items-stretch  gap-6 px-6">
            {sidebarLink.map(({ name, link, image }) => {
              const isActive =
                (pathname.includes(link) && link.length > 1) ||
                pathname === link;

              return (
                <Link
                  href={link}
                  key={link}
                  className={`flex-row-center gap-4 py-4 px-3 hover:bg-shade-300 rounded-lg ${
                    isActive && "bg-primary-500 "
                  }`}
                >
                  <Image
                    src={images[image]}
                    width={20}
                    height={20}
                    alt={name}
                  />
                  <p className="hidden sm:block">{name}</p>
                </Link>
              );
            })}
            <div className="hidden sm:block">{userId && <SignOut />}</div>
          </aside>
        </section>
      )}
    </>
  );
}
export const Sidebar = memo(SidebarNavigation);
