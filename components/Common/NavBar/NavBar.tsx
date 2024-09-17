// import { useMemo } from "react";
// import Image from "next/image";
// import UserNavBar from "@/components/Roles/User/NavBar/UserNavBar";

// import IssuerNavBar from "@/components/Roles/Issuer/NavBar/IssuerNavBar";
// import VerifierNavBar from "@/components/Roles/Verifier/NavBar/VerifierNavBar";
// interface NavBarProps {
//   role: string | null;
//   activeNav: string;
// }
// export default function NavBar({ role, activeNav }: NavBarProps) {
//   const renderRoleNavBar = useMemo(() => {
//     switch (role) {
//       case "User":
//         return <UserNavBar activeNav={activeNav} role={role} />;
//       case "Issuer":
//         return <IssuerNavBar activeNav={activeNav} role={role} />;
//       case "Verifier":
//         return <VerifierNavBar activeNav={activeNav} role={role} />;
//       default:
//         return null;
//     }
//   }, [role, activeNav]);

//   return <>{renderRoleNavBar}</>;
// }
import React, { useMemo } from "react";
import GenericNavBar from "./GenericNavbar";
import ConnectionNavBar from "@/components/Common/Connection/Sections/NavBar/ConnectionNavbar";

interface NavBarProps {
  role: string | null;
  activeNav: string;
}

const CredentialNav = () => <div>CredentialNav</div>;
const ProofRequestNav = () => <div>ProofRequestNav</div>;
const SchemaNav = () => <div>SchemaNav</div>;
const IssuanceNav = () => <div>IssuanceNav</div>;
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
