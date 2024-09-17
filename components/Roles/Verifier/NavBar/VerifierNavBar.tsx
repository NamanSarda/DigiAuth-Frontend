import { Input } from "@/components/ui/input";
import ConnectionNavBar from "../../../Common/Connection/Sections/NavBar/ConnectionNavbar";

type TactiveNav = {
  activeNav: string;
  role: string | null;
};

export default function VerifierNavBar({ activeNav }: TactiveNav) {
  return (
    <>
      <div className="flex-1 bg-[#E5E5E5]">
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="w-1/2 flex justify-center">
            <Input className="w-3/4" placeholder="Search" />
          </div>
          <div className="flex items-center space-x-4">Logo</div>
        </div>
        <div className="p-6">
          {activeNav === "Connections" && <ConnectionNavBar />}
          {activeNav === "RequestProof" && <RequestProof />}
        </div>
      </div>
    </>
  );
}

const RequestProof = () => <div>RequestProof</div>;
