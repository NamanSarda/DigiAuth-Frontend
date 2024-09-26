// {/* <CertificatesCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import CredentialCard from "./CredentialsCard";

// Define the shape of your Certificates data
interface Certificate {
  DID: string;
  Name: string;
  ID: string;
  i: number;
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

  // // Render loading, error, or the list of certificates
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      {certificates.length === 0 ? (
        <div>No Received certificates</div>
      ) : (
        certificates.map((certificate) => (
          <CredentialCard
            key={certificate.ID}
            DID={certificate.DID}
            Name={certificate.Name}
            ID={certificate.ID}
            i={certificate.i}
          />
        ))
      )}
    </div>
  );
}
