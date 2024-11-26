import React, { useMemo } from "react";
import GenericNavBar from "./GenericNavbar";

import ConnectionNavBar from "@/components/Common/Connection/Sections/SubNavBar/ConnectionNavbar";
import IssuanceNav from "@/components/Roles/Issuer/Issuance/IssuanceNavBar";
import SchemaNav from "@/components/Roles/Issuer/Schema/SchemaNavBar";
import CredentialNav from "@/components/Roles/User/Credentials/CredentialsNavBar";
import ProofNav from "@/components/Roles/Verifier/Proofs/ProofNavbar";
import PresentProofNav from "@/components/Roles/User/Proof/ProofNavbar";
interface NavBarProps {
  role: string | null;
  activeNav: string;
}

// const PresentProofNav = () => <div>RevocationNav</div>;

export default function NavBar({ role, activeNav }: NavBarProps) {
  const navItems = useMemo(() => {
    const commonItems = [
      { key: "Connections", component: <ConnectionNavBar /> },
    ];

    switch (role) {
      case "User":
        return [
          ...commonItems,
          { key: "Credentials", component: <CredentialNav /> },
          { key: "PresentProof", component: <PresentProofNav /> },
        ];
      case "Issuer":
        return [
          ...commonItems,
          { key: "Schema", component: <SchemaNav /> },
          { key: "Issuance", component: <IssuanceNav /> },
          // { key: "Revocation", component: <RevocationNav /> },
        ];
      case "Verifier":
        return [
          ...commonItems,
          { key: "RequestProof", component: <ProofNav /> },
        ];
      default:
        return commonItems;
    }
  }, [role]);

  return (
    <>
      <GenericNavBar activeNav={activeNav} navItems={navItems} />
    </>
  );
}
