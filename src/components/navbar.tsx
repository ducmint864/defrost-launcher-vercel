import React, { useState } from "react";
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
} from "@heroicons/react/24/solid";
import { connectWallet } from "../utils/wallet";
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

const NAV_MENU = [
  {
    name: "My investment",
    icon: RectangleStackIcon,
    href: "",
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
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    const account = await connectWallet();
    if (account) {
      setWalletAddress(account);
    }
  };

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      // Kiểm tra vị trí cuộn để cập nhật state isScrolling
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
      color={"transparent"}
      className={`fixed top-0 z-50 border-0 transition-all duration-300 ${"bg-[#16202B]"}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography color={"white"} className="text-lg font-bold">
          Solidithi Launchpad
        </Typography>
        <ul className={`ml-10 hidden items-center gap-6 lg:flex text-white`}>
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <ConnectWallet />
        </div>
        <IconButton
          variant="text"
          color={"white"}
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
