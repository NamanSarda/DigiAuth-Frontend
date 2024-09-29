import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NavItem = {
  key: string;
  component: React.ReactNode;
};

type NavBarProps = {
  activeNav: string;
  navItems: NavItem[];
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userid");
  localStorage.removeItem("email");
  window.location.href = "/";
};

const GenericNavBar: React.FC<NavBarProps> = ({ activeNav, navItems }) => {
  return (
    <div className="flex-1 bg-[#E5E5E5]">
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="w-1/2 flex justify-center">
          <Input className="w-3/4" placeholder="Search" />
        </div>
        <Button className="" onClick={handleLogout}>
          Logout
        </Button>
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
