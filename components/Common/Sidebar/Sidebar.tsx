import React, { useMemo } from "react";
import GenericSideBar from "./GenericSideBar";
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
  const navItems = useMemo(() => {
    const commonItems = [{ key: "Connections", label: "Connections" }];

    switch (role) {
      case "User":
        return [
          ...commonItems,
          { key: "Credentials", label: "Credentials" },
          { key: "ProofRequest", label: "Proof Request" },
        ];
      case "Issuer":
        return [
          ...commonItems,
          { key: "Schema", label: "Schema" },
          { key: "Issuance", label: "Issuance" },
          { key: "Revocation", label: "Revocation" },
        ];
      case "Verifier":
        return [
          ...commonItems,
          { key: "RequestProof", label: "Request Proof" },
        ];
      default:
        return commonItems;
    }
  }, [role]);

  return (
    <GenericSideBar
      role={role}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      navItems={navItems}
      logoSrc={image}
    />
  );
}
