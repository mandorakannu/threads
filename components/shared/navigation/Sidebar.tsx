"use client";
import { memo } from "react";
import { home, search, heart, user, create } from "@shared_ui/Images";
import Image from "next/image";
import sidebarLink from "@jsons/sidebar-links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
function SidebarNavigation() {
  const images = [home, search, heart, create, user];
  const pathname = usePathname();
  return (
    <>
      <section className="sticky left-0 top-0 z-20 flex-col-between h-screen w-fit overflow-auto border-r pb-5 pt-28 max-md:hidden bg-secondary-300 text-white">
        <aside className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarLink.map(({ name, link, image }) => {
            const isActive =
              (pathname.includes(link) && link.length > 1) || pathname === link;

            return (
              <Link
                href={link}
                key={link}
                className={`flex-row-center gap-4 py-4 px-3 hover:bg-shade-300 rounded-lg ${
                  isActive && "bg-primary-500 "
                }`}
              >
                <Image src={images[image]} width={20} height={20} alt={name} />
                <p>{name}</p>
              </Link>
            );
          })}
        </aside>
      </section>
    </>
  );
}
export const Sidebar = memo(SidebarNavigation);
