"use client";
import React, { memo, useState } from "react";
import { logo } from "@shared_ui/Images";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProtectRoutes } from "@hooks/useProtectRoutes";
import { DrawerNavigation } from "./Drawer";

function Navbar() {
  const path = usePathname();
  const protectedRoutes = useProtectRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!protectedRoutes.includes(path) ? (
        <header className="border-b-2 bg-secondary-300 text-white fixed top-0 z-30 w-full px-4">
          <nav className="flex-row-between py-3">
            <section className="flex-row-between gap-10">
              <Image src={logo} alt="logo" />
              <span>Threads</span>
            </section>
            <div
              className="space-y-2 cursor-pointer p-2 hover:bg-tertiary-50 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(true)}
            >
              <span className="block w-8 h-0.5 bg-white"></span>
              <span className="block w-8 h-0.5 bg-white"></span>
              <span className="block w-8 h-0.5 bg-white"></span>
            </div>
            <DrawerNavigation
              isOpen={isOpen}
              onOpen={() => setIsOpen(!isOpen)}
            />
          </nav>
        </header>
      ) : null}
    </>
  );
}

export const Navigation = memo(Navbar);
