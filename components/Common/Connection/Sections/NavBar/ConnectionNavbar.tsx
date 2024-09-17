import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import PendingSection from "../PendingSection";
import ActiveSection from "../ActiveSection";
import NewConnection from "../NewConnection";

const ConnectionNavBar = () => {
  const [activeTab, setActiveTab] = useState("active");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderConnectionCards = useMemo(() => {
    const sections = {
      active: <ActiveSection />,
      pending: <PendingSection />,
      new: <NewConnection />,
    };

    return sections[activeTab] || null;
  }, [activeTab]);

  return (
    <div className="p-6">
      <Tabs className="mb-4">
        <div className="flex space-x-4">
          <Button
            className={`border-b-2 ${
              activeTab === "active" ? "border-blue-900" : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("active")}
          >
            Active
          </Button>
          <Button
            className={`border-b-2 ${
              activeTab === "pending" ? "border-blue-900 " : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("pending")}
          >
            Pending
          </Button>
          <Button
            className={`border-b-2 ${
              activeTab === "new" ? "border-blue-900" : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("new")}
          >
            New
          </Button>
        </div>
      </Tabs>
      <div className="grid grid-cols-2 gap-4">{renderConnectionCards}</div>
    </div>
  );
};

export default ConnectionNavBar;
