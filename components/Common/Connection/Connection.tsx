"use client";

import { FC, useState } from "react"; // Import FC type from React
import SideBar from "@/components/Common/Sidebar/Sidebar";
import NavBar from "@/components/Common/Connection/Sections/NavBar/ConnectionNavbar";

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [activeNav, setActiveNav] = useState<string>("Issuer");
  return (
    <div className="flex h-screen">
      <SideBar activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavBar activeNav={activeNav} />
    </div>
  );
};
