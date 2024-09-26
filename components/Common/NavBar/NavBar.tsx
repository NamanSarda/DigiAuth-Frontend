import React, { useMemo } from "react";
import GenericNavBar from "./GenericNavbar";
import ConnectionNavBar from "@/components/Common/Connection/Sections/SubNavBar/ConnectionNavbar";
import IssuanceNav from "@/components/Roles/Issuer/Sections/Issuance/IssuanceNavBar";
import SchemaNav from "@/components/Roles/Issuer/Sections/Schema/SchemaNavBar";
import CredentialNav from "@/components/Roles/User/Credentials/CredentialsNavBar";
interface NavBarProps {
  role: string | null;
  activeNav: string;
}

const ProofRequestNav = () => <div>ProofRequestNav</div>;
const RevocationNav = () => <div>RevocationNav</div>;
const RequestProof = () => <div>RequestProof</div>;

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
          { key: "ProofRequest", component: <ProofRequestNav /> },
        ];
      case "Issuer":
        return [
          ...commonItems,
          { key: "Schema", component: <SchemaNav /> },
          { key: "Issuance", component: <IssuanceNav /> },
          { key: "Revocation", component: <RevocationNav /> },
        ];
      case "Verifier":
        return [
          ...commonItems,
          { key: "RequestProof", component: <RequestProof /> },
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
