"use client";

import { FC, useState } from "react"; // Import FC type from React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [activeNav, setActiveNav] = useState<string>("Issuer");

  const renderConnectionCards = () => {
    if (activeTab === "active") {
      return (
        <>
          {/* Render connection cards for active tab */}
          <Card className="bg-white p-4 shadow-sm">
            <CardHeader className="mb-2">
              <CardTitle>Active Connection 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>DID:</p>
            </CardContent>
          </Card>
          <Card className="bg-white p-4 shadow-sm">
            <CardHeader className="mb-2">
              <CardTitle>Active Connection 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>DID:</p>
            </CardContent>
          </Card>
        </>
      );
    } else if (activeTab === "pending") {
      return (
        <>
          {/* Render connection cards for pending tab */}
          <Card className="bg-white p-4 shadow-sm">
            <CardHeader className="mb-2">
              <CardTitle>Pending Connection 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>DID:</p>
            </CardContent>
          </Card>
          <Card className="bg-white p-4 shadow-sm">
            <CardHeader className="mb-2">
              <CardTitle>Pending Connection 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>DID:</p>
            </CardContent>
          </Card>
          <Card className="bg-white p-4 shadow-sm">
            <CardHeader className="mb-2">
              <CardTitle>Pending Connection 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p>DID:</p>
            </CardContent>
          </Card>
        </>
      );
    } else if (activeTab === "new") {
      return (
        <>
          {/* Render connection cards for new tab */}
          <Button className="bg-[#D9D9D9] text-black ">
            Create New Invitation
          </Button>
          <Button className="bg-[#D9D9D9] text-black">
            Accept New Invitation
          </Button>
        </>
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex h-screen">
        <div
          className="w-60 p-6"
          style={{ background: "linear-gradient(#58B8C7, #2C3E50)" }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white rounded-full p-2">
              <img
                alt="Logo"
                className="h-10"
                height="40"
                src="/DigiAuth-Frontend/assets/Logo(DigiAuth).png"
                style={{
                  aspectRatio: "100/40",
                  objectFit: "cover",
                }}
                width="100"
              />
            </div>
          </div>
          <div className="mb-8 flex justify-center">
            <h1 className="text-white text-lg font-semibold">ISSUER</h1>
          </div>
          <nav className="space-y-4">
            <Button
              className={`w-full ${
                activeNav === "Connections"
                  ? "bg-[#04202c] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => setActiveNav("Connections")}
            >
              Connections
            </Button>
            <Button
              className={`w-full ${
                activeNav === "Schema"
                  ? "bg-[#04202c] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => setActiveNav("Schema")}
            >
              Schema
            </Button>
            <Button
              className={`w-full ${
                activeNav === "Issuance"
                  ? "bg-[#04202c] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => setActiveNav("Issuance")}
            >
              Issuance
            </Button>
            <Button
              className={`w-full ${
                activeNav === "Revocation"
                  ? "bg-[#04202c] text-white"
                  : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => setActiveNav("Revocation")}
            >
              Revocation
            </Button>
          </nav>
        </div>
      </div>
      <div className="flex-1 bg-[#E5E5E5]">
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="w-1/2 flex justify-center">
            <Input className="w-3/4" placeholder="Search" />
          </div>
          <div className="flex items-center space-x-4">
            <CircleUserIcon className="w-6 h-6 text-black cursor-pointer" />
            <BarChartIcon className="w-6 h-6 text-black cursor-pointer" />
            <SettingsIcon className="w-6 h-6 text-black cursor-pointer" />
          </div>
        </div>
        <div className="p-6">
          <Tabs className="mb-4">
            <div className="flex space-x-4">
              <Button
                className={`border-b-2 ${
                  activeTab === "active" ? "border-blue-900" : ""
                }`}
                variant="ghost"
                onClick={() => setActiveTab("active")}
              >
                Active
              </Button>
              <Button
                className={`border-b-2 ${
                  activeTab === "pending" ? "border-blue-900 " : ""
                }`}
                variant="ghost"
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </Button>
              <Button
                className={`border-b-2 ${
                  activeTab === "new" ? "border-blue-900" : ""
                }`}
                variant="ghost"
                onClick={() => setActiveTab("new")}
              >
                New
              </Button>
            </div>
          </Tabs>
          <div className="grid grid-cols-2 gap-4">
            {renderConnectionCards()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component
export default Component;

interface IconProps {
  className: string;
}

// Define SVG components as function components with FC<IconProps> type
const CircleUserIcon: FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
};

const BarChartIcon: FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
};

const LinkIcon: FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};

const SettingsIcon: FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};
