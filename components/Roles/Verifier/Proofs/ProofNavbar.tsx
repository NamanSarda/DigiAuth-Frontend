import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import ProofList from "./ProofList";
import RequestProof from "./RequestProof";

// Define a type for the possible tab keys
type TabKey = "proofList" | "requestProof";

const ProofNav = () => {
  // Specify the type of state as TabKey
  const [activeTab, setActiveTab] = useState<TabKey>("proofList");

  // Define the function type for handling tab clicks
  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
  };

  // Define the sections with explicit type
  const renderContent = useMemo(() => {
    const sections: Record<TabKey, JSX.Element> = {
      proofList: <ProofList />,
      requestProof: <RequestProof />,
    };

    return sections[activeTab];
  }, [activeTab]);

  return (
    <div className="p-6">
      {/* Tabs Navigation */}
      <Tabs className="mb-4">
        <div className="flex space-x-4">
          <Button
            className={`border-b-2 ${
              activeTab === "proofList" ? "border-blue-900" : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("proofList")}
          >
            Proof List
          </Button>
          <Button
            className={`border-b-2 ${
              activeTab === "requestProof" ? "border-blue-900" : ""
            }`}
            variant="ghost"
            onClick={() => handleTabClick("requestProof")}
          >
            Request Proof
          </Button>
        </div>
      </Tabs>

      {/* Render Content */}
      <div>{renderContent}</div>
    </div>
  );
};

export default ProofNav;
