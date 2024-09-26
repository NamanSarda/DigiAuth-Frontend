import React, { useState, useEffect } from "react";
import CredentialCard from "./CredentialsCard";

// Define the shape of your Certificates data
interface Certificate {
  // DID: string;
  UserName: string;
  ConnectionID: string;
  i: number;
  CredentialDefinition: string; // Add this line if needed for future expansions
  IssuerName: string; // Add this line if needed for future expansions
  Attributes: { key: string; value: string }[]; // Add this line for attributes
}

export default function Issued() {
  // State to store Certificatess and loading/error states
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // // Fetch Certificates when the component mounts
  // useEffect(() => {
  //   const fetchCertificates = async () => {
  //     try {
  //       // Replace with your API endpoint
  //       const response = await fetch("/api/certificates/active");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       // Set the fetched data to state
  //       setCertificates(data);
  //     } catch (error) {
  //       // Set error message
  //       setError("Failed to fetch certificates");
  //     } finally {
  //       // Set loading to false
  //       setLoading(false);
  //     }
  //   };

  //   fetchCertificates();
  // }, []);

  // Dummy data
  useEffect(() => {
    const sampleData: Certificate[] = [
      {
        // DID: "did:example:123456789",
        UserName: "John Doe",
        ConnectionID: "693a92bb-fc3f-4f99-9096-fd1328cc7820",
        i: 1,
        CredentialDefinition: "VBErVjLajTWdWjKPyt:3:CL:2082:default", // If applicable
        IssuerName: "RCOEM", // If applicable
        Attributes: [
          { key: "SGPA", value: "9.7" },
          { key: "CGPA", value: "9.9" },
        ],
      },
    ];

    setCertificates(sampleData);
  }, []);

  // Render loading, error, or the list of certificates
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      {certificates.length === 0 ? (
        <div>No Received certificates</div>
      ) : (
        certificates.map((certificate) => (
          <CredentialCard
            // key={certificate.ID}
            // DID={certificate.DID}
            UserName={certificate.UserName}
            ConnectionID={certificate.ConnectionID}
            i={certificate.i}
            CredentialDefinition={certificate.CredentialDefinition}
            IssuerName={certificate.IssuerName}
            Attributes={certificate.Attributes} // If applicable
          />
        ))
      )}
    </div>
  );
}
