import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import Issued from "./Issued";
import NewIssuance from "./NewIssuance";

// Define a type for the possible tab keys
type TabKey = "active" | "new";

const IssuanceNav = () => {
  // Specify the type of state as TabKey
  const [activeTab, setActiveTab] = useState<TabKey>("active");

  // Define the function type for handling tab clicks
  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
  };

  // Define the sections with explicit type
  const renderConnectionCards = useMemo(() => {
    const sections: Record<TabKey, JSX.Element> = {
      active: <Issued />,
      new: <NewIssuance />,
    };

    return sections[activeTab];
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
            Issued
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

export default IssuanceNav;
