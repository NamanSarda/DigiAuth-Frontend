import React from "react";
import { Input } from "@/components/ui/input";

type NavItem = {
  key: string;
  component: React.ReactNode;
};

type NavBarProps = {
  activeNav: string;
  navItems: NavItem[];
};

const GenericNavBar: React.FC<NavBarProps> = ({ activeNav, navItems }) => {
  return (
    <div className="flex-1 bg-[#E5E5E5]">
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="w-1/2 flex justify-center">
          <Input className="w-3/4" placeholder="Search" />
        </div>
        <div className="flex items-center space-x-4">Logo</div>
      </div>
      <div className="p-6">
        {navItems.map(
          (item) =>
            activeNav === item.key && (
              <React.Fragment key={item.key}>{item.component}</React.Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default GenericNavBar;
