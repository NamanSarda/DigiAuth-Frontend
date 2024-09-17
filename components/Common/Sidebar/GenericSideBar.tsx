import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type NavItem = {
  key: string;
  label: string;
};

type SideBarProps = {
  role: string | null;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  navItems: NavItem[];
  logoSrc: any;
};

const GenericSideBar: React.FC<SideBarProps> = ({
  role,
  activeNav,
  setActiveNav,
  navItems,
  logoSrc,
}) => {
  return (
    <div className="flex h-screen">
      <div
        className="w-60 p-6"
        style={{ background: "linear-gradient(#58B8C7, #2C3E50)" }}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white rounded-full p-2">
            <Image
              alt="Logo"
              className="h-10"
              height={40}
              src={logoSrc}
              style={{ aspectRatio: "100/40", objectFit: "cover" }}
              width={100}
            />
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-white text-lg font-semibold">{role}</h1>
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Button
              key={item.key}
              className={`w-full ${
                activeNav === item.key
                  ? "bg-[#04202c] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => setActiveNav(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default GenericSideBar;
