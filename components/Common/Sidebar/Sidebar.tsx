import { useMemo } from "react";
import Image from "next/image";
import IssuerSideBar from "@/components/Roles/Issuer/Sidebar/IssuerSideBar";
import UserSideBar from "@/components/Roles/User/Sidebar/UserSideBar";
import VerifierSideBar from "@/components/Roles/Verifier/Sidebar/VerifierSideBar";
import image from "@/assets/Logo(DigiAuth).png";

interface SideBarProps {
  role: string | null;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export default function SideBar({
  role,
  activeNav,
  setActiveNav,
}: SideBarProps) {
  const renderRoleSideBar = useMemo(() => {
    switch (role) {
      case "User":
        return (
          <UserSideBar activeNav={activeNav} setActiveNav={setActiveNav} />
        );
      case "Issuer":
        return (
          <IssuerSideBar activeNav={activeNav} setActiveNav={setActiveNav} />
        );
      case "Verifier":
        return (
          <VerifierSideBar activeNav={activeNav} setActiveNav={setActiveNav} />
        );
      default:
        return null;
    }
  }, [role, activeNav, setActiveNav]);

  return (
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
              height={40}
              src={image}
              style={{ aspectRatio: "100/40", objectFit: "cover" }}
              width={100}
            />
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-white text-lg font-semibold">{role}</h1>
        </div>
        {renderRoleSideBar}
      </div>
    </div>
  );
}
