"use client";

import { FC, useState } from "react"; // Import FC type from React
import SideBar from "@/components/Common/Sidebar/Sidebar";
import NavBar from "@/components/Common/NavBar/Navbar";

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  // const [activeTab, setActiveTab] = useState<string>("connection");
  const [activeNav, setActiveNav] = useState<string>("");

  return (
    <div className="flex h-screen">
      <SideBar role="User" activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavBar role="User" activeNav={activeNav} />
    </div>
  );
};

// Export component
export default Component;
