import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import PresentProof from "./PresentProof";

// Define a type for the possible tab keys
type TabKey = "presentProof";

const PresentProofNav = () => {
  // Specify the type of state as TabKey, initializing it to "presentProof" since that's the only valid tab
  const [activeTab, setActiveTab] = useState<TabKey>("presentProof");

  // Define the function type for handling tab clicks
  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
  };

  // Define the sections with explicit type
  const renderContent = useMemo(() => {
    const sections: Record<TabKey, JSX.Element> = {
      presentProof: <PresentProof />,
    };

    return sections[activeTab]; // Always returns the content based on the active tab
  }, [activeTab]);

  return (
    <div className="p-6">
      {/* Tabs Navigation */}
      <Tabs className="mb-4">
        <div className="flex space-x-4">
          <Button
            className={`border-b-2 ${
              activeTab === "presentProof" ? "border-blue-900" : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("presentProof")}
          >
            Present Proof
          </Button>
        </div>
      </Tabs>

      {/* Render Content */}
      <div>{renderContent}</div>
    </div>
  );
};

export default PresentProofNav;
