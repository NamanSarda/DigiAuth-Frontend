// SideBar.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SideBarProps {
  role: string;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function SideBar({
  role,
  activeNav,
  setActiveNav,
}: SideBarProps) {
  return (
    <>
      <div className="flex h-screen">
        <div
          className="w-60 p-6"
          style={{ background: "linear-gradient(#58B8C7, #2C3E50)" }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white rounded-full p-2">
              <Image
                alt="Logo"
                className="h-10"
                height="40"
                src="/Logo(DigiAuth).png"
                style={{
                  aspectRatio: "100/40",
                  objectFit: "cover",
                }}
                width="100"
              />
            </div>
          </div>
          <div className="mb-8">
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
    </>
  );
}
