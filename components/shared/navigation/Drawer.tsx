import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, Fragment } from "react";
import links from "@jsons/navbar-links.json";
import SocialIcons from "@ui/Social-Icons";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { logout } from "@shared_ui/Images";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
}

export function DrawerNavigation({ isOpen, onOpen }: Props) {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const onClose = () => onOpen();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="bg-secondary-200 text-white">
          <DrawerCloseButton className="focus:border-none" />
          <DrawerHeader className="text-lg">
            Threads | Kannu Mandora
          </DrawerHeader>

          <DrawerBody>
            <ul className="list-none">
              {links.map(({ name, link }, index) => (
                <Fragment key={index}>
                  <li className="my-6">
                    <Link
                      href={link}
                      className="hover:text-primary-500 active:text-primary-500 transition-colors duration-100 ease-linear"
                    >
                      {name.toUpperCase()}
                    </Link>
                  </li>
                  <hr />
                </Fragment>
              ))}
              <SignedIn>
                <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                  <div className="flex cursor-pointer gap-4 p-4 my-4  bg-secondary-50 hover:bg-secondary-100 transition-colors delay-75 ease-in-out rounded">
                    <Image src={logout} alt="logout" width={24} height={24} />

                    <p>Log Out</p>
                  </div>
                </SignOutButton>
              </SignedIn>
            </ul>
          </DrawerBody>

          <DrawerFooter>
            <SocialIcons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
