import { Button } from "@/components/ui/button";
interface VerifierSideBarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function VerifierSideBar({
  activeNav,
  setActiveNav,
}: VerifierSideBarProps) {
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
          onClick={() => setActiveNav("RequestProof")}
        >
          RequestProof
        </Button>
      </nav>
    </>
  );
}
