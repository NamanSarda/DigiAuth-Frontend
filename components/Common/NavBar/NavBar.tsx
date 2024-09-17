import { useMemo } from "react";
import Image from "next/image";
import UserNavBar from "@/components/Roles/User/NavBar/UserNavBar";

import IssuerNavBar from "@/components/Roles/Issuer/NavBar/IssuerNavBar";
import VerifierNavBar from "@/components/Roles/Verifier/NavBar/VerifierNavBar";
interface NavBarProps {
  role: string | null;
  activeNav: string;
}
export default function NavBar({ role, activeNav }: NavBarProps) {
  const renderRoleNavBar = useMemo(() => {
    switch (role) {
      case "User":
        return <UserNavBar activeNav={activeNav} role={role} />;
      case "Issuer":
        return <IssuerNavBar activeNav={activeNav} role={role} />;
      case "Verifier":
        return <VerifierNavBar activeNav={activeNav} role={role} />;
      default:
        return null;
    }
  }, [role, activeNav]);

  return <>{renderRoleNavBar}</>;
}
