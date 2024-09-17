import { Input } from "@/components/ui/input";
import ConnectionNavBar from "../../../Common/Connection/Sections/NavBar/ConnectionNavbar";

type TactiveNav = {
  activeNav: string;
  role: string|null;
};

export default function UserNavBar({ activeNav }: TactiveNav) {
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
          {activeNav === "Credentials" && <CredentialNav />}
          {activeNav === "ProofRequest" && <ProofRequestNav />}
        </div>
      </div>
    </>
  );
}

const CredentialNav = () => <div>CredentialNav</div>;
const ProofRequestNav = () => <div>ProofRequestNav</div>;
