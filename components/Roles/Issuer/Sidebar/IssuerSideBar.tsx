import { Button } from "@/components/ui/button";
interface IssuerSideBarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function IssuerSideBar({
  activeNav,
  setActiveNav,
}: IssuerSideBarProps) {
  return (
    <>
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
    </>
  );
}
