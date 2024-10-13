import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  CommandLineIcon,
  XMarkIcon,
  Bars3Icon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { DollarCircleOutlined } from "@ant-design/icons";
import { ConnectWallet } from "@thirdweb-dev/react";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Link href={href || "#"} passHref>
        <Typography
          as="span"
          variant="paragraph"
          className="flex items-center gap-2 font-medium"
        >
          {children}
        </Typography>
      </Link>
    </li>
  );
}

interface NavbarProps {
  backgroundColor?: string;
  isOwner?: boolean;
}

export function Navbar({
  backgroundColor = "transparent",
  isOwner,
}: NavbarProps) {
  const [NAV_MENU, SET_NAV_MENU] = useState([
    {
      name: "My investment",
      icon: RectangleStackIcon,
      href: "/investment",
    },
    {
      name: "Swap",
      icon: DollarCircleOutlined,
      href: "/swap",
    },
    {
      name: "Launchpad",
      icon: CommandLineIcon,
      href: "/launchpad",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const checkProjectOwner = async () => {
      const owner = true;
      if (owner) {
        SET_NAV_MENU((prevMenu) => [
          {
            name: "My project",
            icon: FireIcon,
            href: "/myproject",
          },
          ...prevMenu,
        ]);
      }
    };
    checkProjectOwner();
  }, []);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      // Cập nhật trạng thái khi cuộn
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      color="transparent"
      className={`fixed top-0 z-50 border-0 transition-all duration-300 ${
        isScrolling ? "bg-[#0b162d] bg-opacity-100" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <Typography
            color="white"
            className="text-lg font-bold transition-transform transform hover:-translate-y-1 duration-300"
          >
            Solidithi Launchpad
          </Typography>
        </Link>
        <ul className="ml-10 hidden items-center gap-6 lg:flex text-white ">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <div className="flex items-center transition-transform transform hover:-translate-y-1 duration-300">
                <Icon className="h-5 w-5 mr-2" />
                <span>{name}</span>
              </div>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <ConnectWallet />
        </div>
        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
