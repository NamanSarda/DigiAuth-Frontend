"use client";
import { FC, useState } from "react"; // Import FC type from React
import SideBar from "@/components/Common/Sidebar/Sidebar";
import NavBar from "@/components/Common/NavBar/Navbar";

interface ComponentProps {
  role: string | null;
}

const Dashboard: FC<ComponentProps> = ({ role }) => {
  // const [activeTab, setActiveTab] = useState<string>("connection");
  const [activeNav, setActiveNav] = useState<string>("");

  return (
    <div className="flex h-screen">
      <SideBar role={role} activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavBar role={role} activeNav={activeNav} />
    </div>
  );
};

// Export component
export default Dashboard;
